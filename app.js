const fs = require('fs');
const readLine = require('readline');

async function readLogFile() {
    const fileStream = fs.createReadStream(`${__dirname}/data/games.log`);
    const rl = readLine.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let games = [];
    let game;
    let index = -1;
    for await (const line of rl) {
        if(line.indexOf('InitGame') > -1) {
            index++;
            game = {
                id: index + 1, 
                total_kills: 0,
                players: [],
                kills: {}
            }
            games.push(game);
        }

        if(line.indexOf('ClientUserinfoChanged') > -1) {
            let player = line.split('\\');
            player[1] = player[1].toString();
            if(!games[index].players.includes(player[1])) {
                games[index].players.push(player[1]); 
                games[index].kills[player[1]] = 0;
            }
        }

        if(line.indexOf('kill') > -1) {
            const subject = line.split('killed');
            if(subject[0].indexOf('<world>') === -1) games[index].total_kills++;
            let playersKills = games[index].players.filter((el) => {
                return subject[0].indexOf(el) !== -1
            });
            if(playersKills.length) games[index].kills[playersKills[0]]++;
            let playersKilleds = games[index].players.filter((el) => {
                return subject[1].indexOf(el) !== -1
            });
            if(playersKilleds.length) {
                if(subject[0].indexOf('<world>') !== -1) {
                    games[index].kills[playersKilleds[0]]--;
                }
            }
        }
    }
    return games;
}

readLogFile().then((response) => {
    console.log(response);
})