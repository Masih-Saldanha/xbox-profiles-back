import axl from "app-xbox-live";

// async function xboxTokenGenerator() {
//     const email = process.env.TOKEN_EMAIL;
//     const password = process.env.TOKEN_PASSWORD;
//     const token: string[] = await axl.Token(email, password);
//     console.log("xboxTokenGenerator token: ", token);
//     return token;
// };

// async function xboxRequester() {
//     // const token1 = process.env.TOKEN_1;
//     // const token2 = process.env.TOKEN_2;
//     // const token = [token1, token2];
//     // console.log("xboxRequester token: ", token);
//     const token = await xboxTokenGenerator();

//     const xl = new axl.Account(`XBL3.0 x=${token[1]};${token[0]}`)
//     // console.log("xboxRequester xl: ", xl);
//     return xl;
// }

function xboxRequester() {
    const email = process.env.TOKEN_EMAIL;
    const password = process.env.TOKEN_PASSWORD;
    const xl = axl.Login(email, password);
    // console.log("xboxRequester xl: ", xl);
    return xl;
};

function verifyGamerTag() {
    
};

const authServices = {
    // xboxTokenGenerator,
    xboxRequester,
    verifyGamerTag,
};

export default authServices;