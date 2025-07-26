export const validateData = (email, password, name="Naval")=>{

    // Enhanced email validation to prevent fake emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(email);
    
    // Additional checks for common fake email patterns
    const fakeEmailPatterns = [
        /^test.*@.*$/i,
        /^dummy.*@.*$/i,
        /^fake.*@.*$/i,
        /^user.*@.*$/i,
        /^admin.*@.*$/i,
        /^demo.*@.*$/i,
        /^example.*@.*$/i,
        /^sample.*@.*$/i,
        /^temp.*@.*$/i,
        /^temporary.*@.*$/i,
        /^123.*@.*$/i,
        /^abc.*@.*$/i,
        /^xyz.*@.*$/i,
        /^qwerty.*@.*$/i,
        /^password.*@.*$/i,
        /^email.*@.*$/i,
        /^login.*@.*$/i,
        /^signup.*@.*$/i,
        /^signin.*@.*$/i,
        /^register.*@.*$/i
    ];
    
    const isFakeEmail = fakeEmailPatterns.some(pattern => pattern.test(email));
    
    // Check for disposable email domains
    const disposableDomains = [
        '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
        'throwaway.email', 'yopmail.com', 'getnada.com', 'mailnesia.com',
        'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'pokemail.net',
        'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com', 'fakeinbox.com',
        'fakeinbox.net', 'maildrop.cc', 'mailmetrash.com', 'mailnesia.com',
        'mailnull.com', 'mintemail.com', 'mytrashmail.com', 'nwldx.com',
        'sharklasers.com', 'spamspot.com', 'spam.la', 'tempr.email', 'tmpeml.com',
        'tmpmail.org', 'trashmail.com', 'trashmail.net', 'trashmailer.com',
        'trashymail.com', 'wegwerfemail.de', 'wegwerfemail.net', 'wegwerfemail.org'
    ];
    
    const emailDomain = email.split('@')[1]?.toLowerCase();
    const isDisposableEmail = disposableDomains.includes(emailDomain);
    
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isNameValid = /^[a-zA-Z ]{3,30}$/.test(name);

    if(!isEmailValid) return "Email Id not valid"
    if(isFakeEmail) return "Please use a real email address"
    if(isDisposableEmail) return "Disposable email addresses are not allowed"
    if(!isPasswordValid) return "Password not valid"
    if(!isNameValid) return "Name not valid"

    return null;
}