const fetch = require("node-fetch");
const readlineSync = require("readline-sync");
const chalk = require('chalk');
const delay = require('delay');

const doGetContext = () => new Promise((resolve,reject) => 
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        //'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'api.usr.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": "8c3f313f-776d-48c5-a5d4-cd7391399495"
        },
        "data": {
            "client": "MOBILE_APPS",
            "info": {
                "applicationName": "Traveloka",
                "applicationVersion": "3.14.0",
                "deviceId": "1503eaa9c7676"+Math.floor(Math.random()),
                "deviceLocale": "en",
                "installType": "INSTALL",
                "isEmulator": false,
                "manufacturer": "samsung",
                "memorySize": "3",
                "model": "SM-G955N",
                "notificationEnabled": true,
                "platform": "ANDROID",
                "platformVersion": "5.1.1",
                "screenDensity": "1.5",
                "screenResolution": "720x1280",
                "storageSize": "61.4"
            },
            "query": {}
        },
        "fields": []
    }
    fetch("https://api.usr.traveloka.com/en-id/v2/user/context/app", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dataStr)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});
const doLogin = (tvtime,tvsess,nonce,user,pass,method) => new Promise((resolve,reject) => 
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        //'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'api.usr.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": nonce,
            "tvLifetime": tvtime,
            "tvSession": tvsess
        },
        "data": {
            "password": pass,
            "rememberMe": true,
            "secure": false,
            "userLoginMethod": method,
            "username": user
        },
        "fields": []
    }
    fetch("https://api.usr.traveloka.com/en-id/v2/user/signin", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(dataStr)
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const doGetAction = (tvtime,tvsess,nonce,otpsessid) => new Promise((resolve,reject) =>
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'api.usr.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": nonce,
            "tvLifetime": tvtime,
            "tvSession": tvsess
        },
        "data": {
            "otpSessionId": otpsessid
        },
        "fields": []
    };
    fetch("https://api.usr.traveloka.com/en-id/v2/user/getotpinfo", {
        method: "POST",
        body: JSON.stringify(dataStr),
        headers: headers
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const doSendOTP = (tvtime,tvsess,nonce,otpsessId,key) => new Promise((resolve,reject) => 
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'api.usr.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": nonce,
            "tvLifetime": tvtime,
            "tvSession": tvsess
        },
        "data": {
            "key": key,
            "otpSessionId": otpsessId
        },
        "fields": []
    }
    fetch("https://api.usr.traveloka.com/en-id/v2/user/sendotp", {
        method: "POST",
        body: JSON.stringify(dataStr),
        headers: headers
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    })
});

const doVerifyOTP = (tvtime,tvsess,nonce,otpSessId, otp) => new Promise((resolve,reject) =>
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'api.usr.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": nonce,
            "tvLifetime": tvtime,
            "tvSession": tvsess
        },
        "data": {
            "authenticationToken": otp,
            "enableTrustedDevice": false,
            "mfaMethod": "OTP",
            "userAuthSessionId": otpSessId,
            "verificationType": "OTP"
        },
        "fields": []
    }
    fetch("https://api.usr.traveloka.com/en-id/v2/user/verifymfa", {
        method: "POST",
        body: JSON.stringify(dataStr),
        headers: headers
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    }) 
});

const doGetData = (tvtime,tvsess,nonce) => new Promise((resolve,reject) =>
{
    var headers = {
        'Accept': 'application/json',
        'Origin': 'm.traveloka.com',
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955N Build/NRD90M)',
        'Host': 'itinerary-api.trp.traveloka.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip'
    };
    var dataStr = {
        "clientInterface": "mobile-android",
        "context": {
            "nonce": nonce,
            "tvLifetime": tvtime,
            "tvSession": tvsess
        },
        "data": {
            "itineraryMetadataSpec": {
                "itineraryTypesHealthSpec": ["FLIGHT", "HOTEL", "TRAIN", "BUS", "SHUTTLE_AIRPORT_TRANSPORT", "VEHICLE_RENTAL", "CONNECTIVITY", "EXPERIENCE", "CULINARY", "CINEMA", "EBILL", "GIFT_VOUCHER", "INSURANCE", "TRAIN_GLOBAL"]
            },
            "itineraryRequestOptions": ["ISSUED_ONLY"],
            "itineraryStatus": "UPCOMING",
            "itineraryTypes": ["FLIGHT", "HOTEL", "TRAIN", "BUS", "SHUTTLE_AIRPORT_TRANSPORT", "VEHICLE_RENTAL", "CONNECTIVITY", "EXPERIENCE", "CULINARY", "CINEMA", "EBILL", "GIFT_VOUCHER", "INSURANCE", "TRAIN_GLOBAL"]
        },
        "fields": []
    }
    fetch("https://itinerary-api.trp.traveloka.com/en-id/v2/tripitinerary/itineraries/v2/fetch", {
        method: "POST",
        body: JSON.stringify(dataStr),
        headers: headers
    })
    .then(res => res.json())
    .then(result => {
        resolve(result)
    })
    .catch(err => {
        reject(err)
    }) 
});

(async () => {
    try {
        const getContext = await doGetContext();
        const username = await readlineSync.question("Email/Phone Number : ");
        const password = await readlineSync.question("Password : ");
        if(!isNaN(username))
        {
            var inputUser = "+"+username.trim();
            var method = "PN";
        } else {
            var inputUser = username.trim();
            var method = "TV";
        }
        const c = await doLogin(getContext.context.tvLifetime,getContext.context.tvSession,getContext.context.nonce,inputUser.trim(),password.trim(),method);
        if(c.action === "MFA_REQUIRED")
        {
            const getAction = await doGetAction(getContext.context.tvLifetime,getContext.context.tvSession,getContext.context.nonce,c.userAuthSessionId);
            const sendOTP   = await doSendOTP(getContext.context.tvLifetime,getContext.context.tvSession,getContext.context.nonce,c.userAuthSessionId,getAction.data.userOTPNotificationDataList[0].key);
            if(sendOTP.data.status === "SUCCESS")
            {
                console.log("OTP Send to "+getAction.data.userOTPNotificationDataList[0].maskedUsername);
                const otp = await readlineSync.question("Enter OTP : ");
                const doVerify = await doVerifyOTP(getContext.context.tvLifetime,getContext.context.tvSession,getContext.context.nonce,c.userAuthSessionId,otp);
                if(doVerify.data.status === "SUCCESS")
                {
                    console.log(chalk`{bold.green OTP Verified, Successfully}`);
                    const log = await doLogin(getContext.context.tvLifetime,getContext.context.tvSession,getContext.context.nonce,inputUser.trim(),password.trim(),method);
                    if(log.data.signInStatus === 'SUCCESS')
                    {
                        console.log("Successfully! Welcome to YarzCode Sniffing Tools "+log.data.userProfileData.firstName+" "+log.data.userProfileData.lastName+"!");
                        console.log(chalk`{bold.yellow Try to sniffing your egift.id link! }`);
                        console.log('');
                        const getting = await doGetData(log.context.tvLifetime,log.context.tvSession,log.context.nonce);
                        if(getting.data.itineraryEntryList[0] !== undefined)
                        {
                            console.log(chalk`You have {bold.green ${getting.data.itineraryEntryList.length} } orders.`);
                            console.log("");
                            let i = 1;
                            getting.data.itineraryEntryList.forEach(async function (isidia) {
                                console.log(+i+". "+ isidia.cardDetailInfo.culinaryDetailInfo.culinaryRedemptionPlaces[0].restaurantName + " -> " + isidia.cardDetailInfo.culinaryDetailInfo.bookingVoucherList[0].voucherUrl+ " ");
                                i++;
                            });
                            await delay (1000);
                            console.log('');
                            console.log("Processing Done!");
                        } else {
                            console.log(chalk`{bold.red Sorry! Your account's not have orders }`);
                        }
                    } else {
                        console.log(log);
                    }
                } else {
                    console.log(doVerify);
                }
            } else {
                console.log(getAction);
            }
        } else {
           if(c.data.signInStatus === 'SUCCESS')
           {
            console.log("Successfully! Welcome to YarzCode Sniffing Tools "+c.data.userProfileData.firstName+" "+c.data.userProfileData.lastName+"!");
            console.log(chalk`{bold.yellow Try to sniffing your egift.id link! }`);
            console.log('');
            const getting = await doGetData(c.context.tvLifetime,c.context.tvSession,c.context.nonce);
            if(getting.data.itineraryEntryList[0] !== undefined)
            {
                console.log(chalk`You have {bold.green ${getting.data.itineraryEntryList.length}} orders.`);
                console.log("");
                let i = 1;
                getting.data.itineraryEntryList.forEach(async function (isidia) {
                    console.log(+i+". "+ isidia.cardDetailInfo.culinaryDetailInfo.culinaryRedemptionPlaces[0].restaurantName + " -> " + isidia.cardDetailInfo.culinaryDetailInfo.bookingVoucherList[0].voucherUrl+ " ");
                    i++;
                });
                await delay (1000);
                console.log('');
                console.log("Processing Done!");
            } else {
                console.log(chalk`{bold.red Sorry! Your account's not have orders }`);
            }
           } else {
               console.log(c);
               console.log(chalk`{bold.red ${c.data.message} }`);
           }
        }
    } catch (err) {
        console.log(err);
    }
})();
