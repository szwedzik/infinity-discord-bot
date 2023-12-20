const request = require('snekfetch');
const baseUrl = "https://data.cftools.cloud";

async function auth(){
    // send request to get token
    let url = baseUrl + "/v1/auth/register";
    let data = {
        'application_id': 'xxxxxxxxxxxxxxxxxxxxx',
        'secret': 'xxxxxxxxxxxxxxxxxxxxx='
    };

    return new Promise((resolve, reject) =>{
        request.post(`${url}`).send(data).then((res) => {
            resolve(res.body);
        }).catch((err) => reject(err));
    });
}

async function checkWhitelist(steamid){
    let token = await auth();
    let url = baseUrl + "/v1/server/ee899f9e-7bb8-4c88-85a0-0db1cc6ae985/whitelist?cftools_id=" + steamid;
    let data = {
        'Authorization': 'Bearer ' + token.token
    };

    return new Promise((resolve, reject) =>{
        request.get(`${url}`).set(data).then((res) => {
            resolve(res.body);
        }).catch((err) => reject(err));
    });

}

async function checkPriority(steamid){

}

async function addWhitelist(steamid){
}

async function removeWhitelist(steamid){
}

module.exports = {
    checkWhitelist,
    addWhitelist,
    removeWhitelist,
}