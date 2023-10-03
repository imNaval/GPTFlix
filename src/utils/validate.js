export const validateData = (email, password, name="Naval")=>{

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isNameValid = /^[a-zA-Z ]{3,30}$/.test(name);

    if(!isEmailValid) return "Email Id not valid"
    if(!isPasswordValid) return "Password not valid"
    if(!isNameValid) return "Name not valid"

    return null;
}