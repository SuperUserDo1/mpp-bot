var MPPclient = require("mpp-client-xt")
var mppClient = new MPPclient()
var channel = "[BOT] Tilda~Тильда [БОТ]"
var admins = ["a888ef4e42c246c566455a9a", "3ca0d4e2836f354537cad392", "4c60f7e82bee4b895aa11e34"] // кот черно зел >:) // КОТ ТОК >:) //оранг >:)
var owners = ["1e045d8824cd8f7f0e1aad72", "3373fcacc22903fa6b90dfe0", "96bdabacf049b83d749175d8"] // читеробус >:) //скиттл >:) //тильда >:)
var banned = "null" // никто >:)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
const MidiPlayer = require("midi-player-js")
const playerOptions = {octaves:0,transpose:0,speed:1};
var p = "~"
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
let notesPlayed = 0, notesDropped = 0;
const notes = {}
const keys = [
    "a-1",
    "as-1",
    "b-1",
    "c0",
    "cs0",
    "d0",
    "ds0",
    "e0",
    "f0",
    "fs0",
    "g0",
    "gs0",
    "a0",
    "as0",
    "b0",
    "c1",
    "cs1",
    "d1",
    "ds1",
    "e1",
    "f1",
    "fs1",
    "g1",
    "gs1",
    "a1",
    "as1",
    "b1",
    "c2",
    "cs2",
    "d2",
    "ds2",
    "e2",
    "f2",
    "fs2",
    "g2",
    "gs2",
    "a2",
    "as2",
    "b2",
    "c3",
    "cs3",
    "d3",
    "ds3",
    "e3",
    "f3",
    "fs3",
    "g3",
    "gs3",
    "a3",
    "as3",
    "b3",
    "c4",
    "cs4",
    "d4",
    "ds4",
    "e4",
    "f4",
    "fs4",
    "g4",
    "gs4",
    "a4",
    "as4",
    "b4",
    "c5",
    "cs5",
    "d5",
    "ds5",
    "e5",
    "f5",
    "fs5",
    "g5",
    "gs5",
    "a5",
    "as5",
    "b5",
    "c6",
    "cs6",
    "d6",
    "ds6",
    "e6",
    "f6",
    "fs6",
    "g6",
    "gs6",
    "a6",
    "as6",
    "b6",
    "c7"
]
mppClient.setChannel(channel)
mppClient.start()
const player = new MidiPlayer.Player();
player.on("midiEvent", e => {
    if (e.name === "Set Tempo") {
        player.setTempo(e.data * playerOptions.speed);
    }
    if (!e.name.startsWith("Note ")) return;
    if (e.channel === 10) return ++notesDropped; // no drums kthx
    for (let i = 0; i < playerOptions.octaves + 1; ++i) {
        const key = keys[e.noteNumber - 21 + playerOptions.transpose - 12*i];
        if(!key) {
           ++notesDropped;
           continue;
        }
        if (e.name === "Note on") {
            notes[key] = true
            mppClient.startNote(key, e.velocity/128);
            ++notesPlayed;
        } else if (notes[key]) {
            notes[key] = false;
            mppClient.stopNote(key);
            ++notesPlayed;
        } else {
            ++notesDropped;
        }
     }

})


const fs = require('fs');

stats = require('./stats.json');

const DVD = require('./lib');
const { maxHeaderSize } = require("http")
var dvd = new DVD(stats)

save = () => {
    fs.writeFile('./stats.json', JSON.stringify(stats), () => {});
}

cursor = setInterval(() => {dvd.update()}, 75);

dvd.onUpdate = () => {
    mppClient.sendArray([{m:'m', x: dvd.pos.x, y: dvd.pos.y}]);
}

dvd.save = () => {
    fs.writeFile(__dirname+"/stats.json", JSON.stringify(dvd.stats), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

cursorOn = () => {
    if (cursor) return false;
    cursor = setInterval(cursorfunc, 75);
    return true;
}

cursorOff = () => {
    if (!cursor) return false;
    clearInterval(cursor);
    return true;
}

/*
cursorCollide = client.on('m', p => {
    if (p._id == client.getOwnParticipant()._id) return;
    if ((pos.x > p.x - 5 && vel.x > 0) || (pos.x < p.x + 5 && vel.x < 0)) {
        vel.x = -vel.x;
    }

    if ((pos.y > p.y - 5 && vel.y > 0) || (pos.y < p.y + 5 && vel.y < 0)) {
        vel.y = -vel.y;
    }
});
*/


mppClient.on("hi", () => {
	mppClient.userset({name: "Tilda/~help"})
})
mppClient.on("a", msg => {
    if (msg.a.startsWith(p + "db")) {
        fs.writeFile('./db.json', JSON.stringify(msg.a.split(" ").join(' ').slice(4)), () => {});
    }
    console.log(`${msg.p.name}: ${msg.a}`);
            //Unit 
        if (msg.a == p + "help") {
            if (msg.p._id == banned) {
                mppClient.say("@" + banned + ", you are in black list")
            } else {
	    	    mppClient.say("Commands: ~help ≈ ~play")
	    	    mppClient.say("Music: Toxic ≈ Megalovania ≈ Mario ≈ BabyShark ≈ Rush-E ≈ Amogus ≈ Pigstep ≈ LetMeDownSlowly ≈ LongDrives ≈ Cradles ≈ InTheEnd ≈ Lovely ≈ AfterDark ≈ BadPiggies ≈ Happier ≈ Wtau ≈ WUnify ≈ Tetris ≈ MyHeart ≈ WOuranos")
		        mppClient.say("Black MIDIs: LoL ≈ BlackMIDI ≈ Rush-EB ≈ BadPiggiesB ≈ GalaxyCollapse")
                mppClient.say("Owner commands: ~kick {_id} ≈ ~stop ≈ ~crown ≈ ~octaves ≈ ~transpose ≈ ~speed ≈ ~chset ≈ ~reset ≈ ~colorc {hex color} ≈ ~color {color} ≈ ~setname {name}")
            }
	    }
            //Fun commands
        if (msg.a == p + "hi") {
            if (msg.p._id == "3373fcacc22903fa6b90dfe0") {
                mppClient.say("Hi @" + msg.p._id + ", I am Tilda!")
                mppClient.say("uwu")
            } else {
                mppClient.say("Hi @" + msg.p._id + ", I am Tilda!")
            }
        }
            //MIDI Player Commands
        if (msg.a == p + "play") {
            if (msg.p._id == banned) {
                mppClient.say("@" + banned + ", you are in black list")
            } else {
                mppClient.say("Command for playing MIDIs. Usage: ~play <MIDI name>")
            }
        }
        if (msg.a.startsWith(p + "play")) {
            if (msg.p._id == banned) {
                mppClient.say("@" + banned + ", you are in black list")
            } else {
            if (msg.a.split(" ")[1] == "AfterDark") {
                player.stop()
                player.loadFile("AfterDark.mid")
                player.play()
                mppClient.say("Now playing Mr.Kitty - After Dark")
            }
            if (msg.a.split(" ")[1] == "Amogus") {
                player.stop()
                player.loadFile("Amogus.mid")
                player.play()
                mppClient.say("Now playing AMOGUS")
            }
            if (msg.a.split(" ")[1] == "BabyShark") {
                player.stop()
                player.loadFile("BabyShark.mid")
                player.play()
                mppClient.say("Now playing Baby Shark")
            }
            if (msg.a.split(" ")[1] == "BlackMIDI") {
                player.stop()
                player.loadFile("BlackMIDI.mid")
                player.play()
                mppClient.say("Now playing Black MIDI Team - Black MIDI")
            }
            if (msg.a.split(" ")[1] == "Cradles") {
                player.stop()
                player.loadFile("Cradles.mid")
                player.play()
                mppClient.say("Now playing Sub Urban - Cradles")
            }
            if (msg.a.split(" ")[1] == "Faded") {
                player.stop()
                player.loadFile("Faded.mid")
                player.play()
                mppClient.say("Now playing Alan Walker - Faded")
            }
            if (msg.a.split(" ")[1] == "Happier") {
                player.stop()
                player.loadFile("Happier.mid")
                player.play()
                mppClient.say("Now playing Marshmello, Bastille - Happier")
            }
            if (msg.a.split(" ")[1] == "InTheEnd") {
                player.stop()
                player.loadFile("InTheEnd.mid")
                player.play()
                mppClient.say("Now playing Linkin Park - In The End")
            }
            if (msg.a.split(" ")[1] == "LetMeDownSlowly") {
                player.stop()
                player.loadFile("LetMeDownSlowly.mid")
                player.play()
                mppClient.say("Now playing Alec Benjamin - Let Me Down Slowly")
            }
            if (msg.a.split(" ")[1] == "Loafers") {
                player.stop()
                player.loadFile("Loafers.mid")
                player.play()
                mppClient.say("Now playing BoyWithUke - Loafers")
            }
            if (msg.a.split(" ")[1] == "LoL") {
                player.stop()
                player.loadFile("LoL.mid")
                player.play()
                mppClient.say("Now playing Black MIDI Team - LoL")
            }
            if (msg.a.split(" ")[1] == "LongDrives") {
                player.stop()
                player.loadFile("LongDrives.mid")
                player.play()
                mppClient.say("Now playing BoyWithUke - Long Drives")
            }
            if (msg.a.split(" ")[1] == "Lovely") {
                player.stop()
                player.loadFile("Lovely.mid")
                player.play()
                mppClient.say("Now playing Billie Eilish, Khalid - Lovely")
            }
            if (msg.a.split(" ")[1] == "Mario") {
                player.stop()
                player.loadFile("Mario.mid")
                player.play()
                mppClient.say("Now playing Mario theme song")
            }
            if (msg.a.split(" ")[1] == "Megalovania") {
                player.stop()
                player.loadFile("Megalovania.mid")
                player.play()
                mppClient.say("Now playing Undertale - Megalovania")
            }
            if (msg.a.split(" ")[1] == "MyHeart") {
                player.stop()
                player.loadFile("MyHeart.mid")
                player.play()
                mppClient.say("Now playing Different Heaven & EH!DE - My Heart")
            }
            if (msg.a.split(" ")[1] == "Pigstep") {
                player.stop()
                player.loadFile("Pigstep.mid")
                player.play()
                mppClient.say("Now playing Minecraft - Pigstep")
            }
            if (msg.a.split(" ")[1] == "Rush-E") {
                player.stop()
                player.loadFile("Rush-E.mid")
                player.play()
                mppClient.say("Now playing Rush E")
            }
            if (msg.a.split(" ")[1] == "Tetris") {
                player.stop()
                player.loadFile("Tetris.mid")
                player.play()
                mppClient.say("Now playing Tetris theme song")
            }
            if (msg.a.split(" ")[1] == "Toxic") {
                player.stop()
                player.loadFile("Toxic.mid")
                player.play()
                mppClient.say("Now playing BoyWithUke - Toxic")
            }
            if (msg.a.split(" ")[1] == "BadPiggies") {
                player.stop()
                player.loadFile("WBadPiggies.mid")
                player.play()
                mppClient.say("Now playing Angry Birds - Bad Piggies")
            }
            if (msg.a.split(" ")[1] == "Wtau") {
                player.stop()
                player.loadFile("Wtau.mid")
                player.play()
                mppClient.say("Now playing tau (White MIDI)")
            }
            if (msg.a.split(" ")[1] == "WUnify") {
                player.stop()
                player.loadFile("WUnify.mid")
                player.play()
                mppClient.say("Now playing Unify (White MIDI)")
            }
            if (msg.a.split(" ")[1] == "WOuranos") {
                player.stop()
                player.loadFile("WOuranos.mid")
                player.play()
                mppClient.say("Now playing Ouranos (White MIDI)")
            }
            if (msg.a.split(" ")[1] == "GalaxyCollapse") {
                player.stop()
                player.loadFile("GalaxyCollapse.mid")
                player.play()
                mppClient.say("Now playing Galaxy Collapse")
            }
        }
        }
        if (owners.indexOf(msg.p._id) !== -1) {
            if (msg.a.split(" ")[1] == "Rush-EB") {
                player.stop()
                player.loadFile("Rush-E2.mid")
                player.play()
                mppClient.say("Now playing Rush E (Black MIDI)")
            }
            if (msg.a == p + "play BadPiggiesB") {
                player.stop()
                player.loadFile("BadPiggies.mid")
                player.play()
                mppClient.say("Now playing Angry Birds - Bad Piggies (Black MIDI)")
            }
            if (msg.a.startsWith(p + "playc")) {
                player.stop()
                player.loadFile(msg.a.split(" ").join(' ').slice(7))
                mppClient.say("Now playing " + msg.a.split(" ").join(' ').slice(7))
                player.play()
            }
            if (msg.a.startsWith(p + "spam")) {
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
                mppClient.say(msg.a.split(" ").join(' ').slice(6))
            }
            if (msg.a == p + "hi") mppClient.say("Hi @" + msg.p._id + ", owner of Tilda!")
            if (msg.a.startsWith(p + "setname")) mppClient.userset({name: msg.a.split(" ").join(' ').slice(8)})
            if (msg.a.startsWith(p + "chset")) mppClient.setChannel(msg.a.split(" ").join(' ').slice(6))
            if (msg.a.startsWith(p + "colorc")) mppClient.userset({color: msg.a.split(" ").join(' ').slice(7)})
            if (msg.a == p + "color black") mppClient.userset({color: "#000000"})
            if (msg.a == p + "color green") mppClient.userset({color: "#008000"})
            if (msg.a == p + "color lime") mppClient.userset({color: "#00ff00"})
            if (msg.a == p + "color red") mppClient.userset({color: "#ff0000"})
            if (msg.a == p + "color orange") mppClient.userset({color: "#ffa500"})
            if (msg.a == p + "color yellow") mppClient.userset({color: "#00ff00"})
            if (msg.a == p + "color blue") mppClient.userset({color: "#0000ff"})
            if (msg.a == p + "color cyan") mppClient.userset({color: "#00ffff"})
            if (msg.a == p + "color pink") mppClient.userset({color: "#ff00e0"})
            if (msg.a == p + "reset") {
		    	playerOptions.speed = 1
		    	playerOptions.transpose = 0
		    	playerOptions.octaves = 0
		    	mppClient.say("Settings reset")
	    	}
            if (msg.a.startsWith(p + "speed")) {
		    	playerOptions.speed = +msg.a.split(" ")[1]
		    	mppClient.say("Speed is set to " + msg.a.split(" ")[1])
		    }
            if (msg.a.startsWith(p + "transpose")) {
		    	playerOptions.transpose = +msg.a.split(" ")[1]
		    	mppClient.say("Transpose is set to " + msg.a.split(" ")[1])
		    }
            if (msg.a.startsWith(p + "octaves")) {
		    	playerOptions.octaves = +msg.a.split(" ")[1]
		    	mppClient.say("Octaves is set to " + msg.a.split(" ")[1])
	    	}
            if (msg.a.startsWith(p + "crown")) mppClient.chown(msg.a.split(" ")[1])
            if (msg.a.startsWith(p + "kick")) mppClient.sendArray([{m: "kickban", _id: msg.a.split(" ")[1], ms: 0}])
            if (msg.a == p + "stop") player.stop()
        }
        if (admins.indexOf(msg.p._id) !== -1) {
            if (msg.a == p + "hi") mppClient.say("Hi @" + msg.p._id + ", admin of Tilda!")
            if (msg.a.startsWith(p + "colorc")) mppClient.userset({color: msg.a.split(" ")[1]})
            if (msg.a == p + "color black") mppClient.userset({color: "#000000"})
            if (msg.a == p + "color green") mppClient.userset({color: "#008000"})
            if (msg.a == p + "color lime") mppClient.userset({color: "#00ff00"})
            if (msg.a == p + "color red") mppClient.userset({color: "#ff0000"})
            if (msg.a == p + "color orange") mppClient.userset({color: "#ffa500"})
            if (msg.a == p + "color yellow") mppClient.userset({color: "#00ff00"})
            if (msg.a == p + "color blue") mppClient.userset({color: "#0000ff"})
            if (msg.a == p + "color cyan") mppClient.userset({color: "#00ffff"})
            if (msg.a == p + "color purple") mppClient.userset({color: "#800080"})
            if (msg.a == p + "color pink") mppClient.userset({color: "#ff00e0"})
            if (msg.a.startsWith(p + "speed")) {
                playerOptions.speed = +msg.a.split(" ")[1]
                mppClient.say("Speed is set to " + msg.a.split(" ")[1])
            }
            if (msg.a.startsWith(p + "kick")) mppClient.sendArray([{m: "kickban", _id: msg.a.split(" ")[1], ms: 0}])
            if (msg.a == p + "stop") player.stop()
        }
});
