import { db } from './firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Rate limiting constants
const USER_HOURLY_LIMIT = 10;
const GLOBAL_DAILY_LIMIT = 200;

// Helper function to get current hour timestamp (rounded to hour)
const getCurrentHour = () => {
  const now = new Date();
  now.setMinutes(0, 0, 0); // Round to current hour
  return now.getTime();
};

// Helper function to get current day timestamp (rounded to day)
const getCurrentDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Round to current day
  return now.getTime();
};

// Check user hourly limit without incrementing
const checkUserHourlyLimitOnly = async (userId) => {
  try {
    const currentHour = getCurrentHour();
    const userDocRef = doc(db, 'userApiCalls', userId);
    
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return { allowed: true, remaining: USER_HOURLY_LIMIT, currentCalls: 0 };
    }
    
    const userData = userDoc.data();
    const hourlyCalls = userData.hourlyCalls || {};
    const currentHourCalls = hourlyCalls[currentHour] || 0;
    
    if (currentHourCalls >= USER_HOURLY_LIMIT) {
      return { 
        allowed: false, 
        remaining: 0,
        currentCalls: currentHourCalls,
        message: 'Your search limit exceeded. Please try again later.' 
      };
    }
    
    return { 
      allowed: true, 
      remaining: USER_HOURLY_LIMIT - currentHourCalls,
      currentCalls: currentHourCalls
    };
    
  } catch (error) {
    console.error('Error checking user hourly limit:', error);
    return { allowed: false, message: 'Error checking rate limit. Please try again.' };
  }
};

// Check global daily limit without incrementing
const checkGlobalDailyLimitOnly = async () => {
  try {
    const currentDay = getCurrentDay();
    const globalDocRef = doc(db, 'globalApiCalls', 'daily');
    
    const globalDoc = await getDoc(globalDocRef);
    
    if (!globalDoc.exists()) {
      return { allowed: true, remaining: GLOBAL_DAILY_LIMIT, currentCalls: 0 };
    }
    
    const globalData = globalDoc.data();
    const dailyCalls = globalData.dailyCalls || {};
    const currentDayCalls = dailyCalls[currentDay] || 0;
    
    if (currentDayCalls >= GLOBAL_DAILY_LIMIT) {
      return { 
        allowed: false, 
        remaining: 0,
        currentCalls: currentDayCalls,
        message: 'Daily search limit exceeded. Please try again tomorrow.' 
      };
    }
    
    return { 
      allowed: true, 
      remaining: GLOBAL_DAILY_LIMIT - currentDayCalls,
      currentCalls: currentDayCalls
    };
    
  } catch (error) {
    console.error('Error checking global daily limit:', error);
    return { allowed: false, message: 'Error checking global limit. Please try again.' };
  }
};

// Increment user hourly limit
const incrementUserHourlyLimit = async (userId) => {
  try {
    const currentHour = getCurrentHour();
    const userDocRef = doc(db, 'userApiCalls', userId);
    
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // First time user, create document
      await setDoc(userDocRef, {
        hourlyCalls: { [currentHour]: 1 },
        lastUpdated: serverTimestamp()
      });
    } else {
      // Update the count
      await updateDoc(userDocRef, {
        [`hourlyCalls.${currentHour}`]: increment(1),
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error incrementing user hourly limit:', error);
  }
};

// Increment global daily limit
const incrementGlobalDailyLimit = async () => {
  try {
    const currentDay = getCurrentDay();
    const globalDocRef = doc(db, 'globalApiCalls', 'daily');
    
    const globalDoc = await getDoc(globalDocRef);
    
    if (!globalDoc.exists()) {
      // First time, create document
      await setDoc(globalDocRef, {
        dailyCalls: { [currentDay]: 1 },
        lastUpdated: serverTimestamp()
      });
    } else {
      // Update the count
      await updateDoc(globalDocRef, {
        [`dailyCalls.${currentDay}`]: increment(1),
        lastUpdated: serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error incrementing global daily limit:', error);
  }
};

// Main function to check both limits
export const checkRateLimits = async (userId) => {
  try {
    // Check global daily limit first
    const globalCheck = await checkGlobalDailyLimitOnly();
    if (!globalCheck.allowed) {
      return globalCheck;
    }
    
    // Check user hourly limit
    const userCheck = await checkUserHourlyLimitOnly(userId);
    if (!userCheck.allowed) {
      return userCheck;
    }
    
    return {
      allowed: true,
      remaining: Math.min(userCheck.remaining, globalCheck.remaining),
      userRemaining: userCheck.remaining,
      globalRemaining: globalCheck.remaining
    };
    
  } catch (error) {
    console.error('Error checking rate limits:', error);
    return { allowed: false, message: 'Error checking rate limits. Please try again.' };
  }
};

// Function to increment both limits (call this after successful API call)
export const incrementRateLimits = async (userId) => {
  try {
    await incrementGlobalDailyLimit();
    await incrementUserHourlyLimit(userId);
  } catch (error) {
    console.error('Error incrementing rate limits:', error);
  }
};

// Clean up old data (can be called periodically)
export const cleanupOldData = async () => {
  try {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    // Clean up user documents older than 24 hours
    const usersRef = collection(db, 'userApiCalls');
    const usersSnapshot = await getDocs(usersRef);
    
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      const lastUpdated = userData.lastUpdated?.toDate();
      
      if (lastUpdated && lastUpdated < oneDayAgo) {
        // Delete old user document
        await setDoc(doc(db, 'userApiCalls', userDoc.id), {
          hourlyCalls: {},
          lastUpdated: serverTimestamp()
        });
      }
    }
    
  } catch (error) {
    console.error('Error cleaning up old data:', error);
  }
}; 