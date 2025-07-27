import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkRateLimits } from '../utils/rateLimiter';
import { FaInfoCircle } from 'react-icons/fa';

const ApiUsageDisplay = () => {
    const [usageInfo, setUsageInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector(store => store.user);

    const fetchUsageInfo = async () => {
        if (!user || !user.uid) return;

        setLoading(true);
        try {
            const rateLimitCheck = await checkRateLimits(user.uid);
            setUsageInfo(rateLimitCheck);
        } catch (error) {
            console.error('Error fetching usage info:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsageInfo();
    }, [user]);

    if (!user || !user.uid) return null;

    return (
        <div className="bg-primary-bg bg-opacity-80 text-white p-3 rounded-lg border border-gray-600 shadow-lg min-w-[200px]">
            <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center">
                    <FaInfoCircle className="text-blue-400" />
                    <span className="text-sm font-medium">API Usage</span>
                </div>
                <span className="text-xs text-gray-400">
                    Resets every hour
                </span>
            </div>

            {loading ? (
                <div className="text-xs text-gray-300">Loading...</div>
            ) : usageInfo ? (
                <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                        <span>Your remaining:</span>
                        <span className={`font-medium ${usageInfo.userRemaining <= 2 ? 'text-red-400' : 'text-green-400'}`}>
                            {usageInfo.userRemaining}/10
                        </span>
                    </div>
                    {/* <div className="flex justify-between">
            <span>Global remaining:</span>
            <span className={`font-medium ${usageInfo.globalRemaining <= 20 ? 'text-red-400' : 'text-green-400'}`}>
              {usageInfo.globalRemaining}/200
            </span>
          </div> */}
                </div>
            ) : (
                <div className="text-xs text-gray-300">Unable to load usage</div>
            )}
        </div>
    );
};

export default ApiUsageDisplay; 