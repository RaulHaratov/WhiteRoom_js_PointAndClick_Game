const ecran = document.querySelector('#ecran')
let cheie_usa = false
let citeste = true
let cheie_mica = false
let end = false

const scenes = {
    first_room: {
      background: "images/first_room.png",
      hotspots: [
        { x: 1040, y: 420, w: 260, h: 515-420, action: () => {
            if(!cheie_usa){
            if(citeste) {dialogue_window_on('La prima vedere, pare o masă obișnuită... Dar stai puțin — aici e o cheie. Poate că, cu ajutorul ei, aș putea descuia ușa.')
                cheie_usa = true}}else{
            if(citeste) dialogue_window_on('Doar o masă.')
            }
        } },
        { x: 235, y: 75, w: 290-235, h: 470-75, action: () => {
            if(citeste) dialogue_window_on('CE E ASTA?!!!')
        }},
        {
            x: 300, y: 118, w: 470-300, h: 410-118, action: () => {
                if(citeste) dialogue_window_on('Ciudat... dar dincolo de fereastră nu se vede nimic. Doar o lumină albă, densă, care pare să înghită orice formă sau culoare. De parcă lumea de afară n-ar mai exista.')
            }
        },
        {
            x: 540, y: 206, w: 712-540, h: 543-206, action: ()=>{
                if(citeste) dialogue_window_on('Un dulap cu cărți... obișnuit, la prima vedere. Ia să vedem: Rusty Lake, Cube Escape, Ace Attorney... STOP! Astea nu-s cărți! Sunt jocuri point and click! Cine mai joacă așa ceva în 2025?!! …Ugh.')
            }
        },
        {
            x: 802, y: 169, w: 989-802, h: 522-169, action: ()=>{
                if(ecran.style.backgroundImage === 'url("images/first_room_end.png")' && citeste) {
                    loadScene('second_room')
                    cheie_usa = false
                    dialogue_window_on('Dincolo, mă aștepta o încăpere ce semăna cu un dormitor – prea liniștit, prea ordonat. N-aveam timp de pierdut. Trebuia să găsesc ieșirea cât mai repede…')
                    return
                }
                if(!cheie_usa){
                    if(citeste) dialogue_window_on('Încerc să deschid ușa. Mânerul rece mi se opune — e încuiată. În cameră trebuie să fie ceva ce mă poate ajuta…')
                }else{
                    if(citeste) {dialogue_window_on('Cheia de pe masă pare că se potrivește și ușa începe să se deschidă încet, cu un scârțâit asurzitor.')
                        ecran.style.backgroundImage = 'url("images/first_room_end.png")'}
                }
            }
        }
      ]
    },
    second_room: {
      background: 'images/second_room.png',
      hotspots: [
        { x: 235, y: 377, w: 676-235, h: 505-377, action: () => {
            if(citeste){
                dialogue_window_on('Un pat perfect aranjat, ca și cum ar aștepta pe cineva… dar timpul pare să-l fi uitat.')
            }}
         },
        { x: 236, y: 535, w: 657-236, h: 695-535, action: () => {if(citeste) loadScene('under_bed')} },
        { x: 1108, y: 159, w: 1267-1108, h: 235-159,
            action: ()=>{
                if(citeste){
                    if(cheie_mica){
                        dialogue_window_on('Aici nu a mai rămas nimic interesant.')
                        return
                    } 
                    dialogue_window_on('Uraaa... incă cărți. STOP! Între carti e un obiect! Cineva a lasat aici o cheie mica. Unde aș putea so folosesc?')
                    cheie_mica = true
                }
            }
        },
        { x: 1048, y: 304, w: 1259-1048, h: 638-304,
            action: ()=>{
                if(citeste)dialogue_window_on('O complet obișnuită lampă, pe o complet obișnuită noptieră, într-o complet obișnuită cameră, într-un complet obișnuit apartament, pe o complet obișnuită stradă, într-un complet obișnuit oraș, într-o complet obișnuită...')
            }
        },
        { x: 697, y: 109, w: 920-697, h: 548-109,
            action: ()=>{
                if(citeste){
                    if(ecran.style.backgroundImage === 'url("images/second_room_end.png")'){
                        loadScene('the_end')
                        dialogue_window_on('În fața mea se deschide un hol lung, îngust, înghițit de întuneric. Pereții par să se apropie ușor, ca și cum spațiul însuși ar respira, viu. La capătul lui, abia zărită, o lumină albă. Poate e ieșirea. Poate e singura mea șansă de a scăpa din locul ăsta blestemat.')
                        document.title = 'YOU BELONG TO US!!!'
                        return
                    }
                    if(cheie_usa){
                        ecran.style.backgroundImage = 'url("images/second_room_end.png")'
                        scenes.second_room.background = "images/second_room_end.png"
                        document.title = 'YOU WILL NEVER LEAVE!!!'
                        return
                    }
                    if(cheie_mica){
                        dialogue_window_on('Cheia care am găsito intre cărti e prea mica și nu se potrivește ușii.')
                        return
                    }
                    dialogue_window_on('Din nou o ușă închisă și din nou trebuie să găsesc cum so deschid.')
                }
            }
        }
      ]
    },
    under_bed: {
        background: 'images/under_bed.png',
        hotspots: [
            { x: 245, y: 358, w: 788-245, h: 566-358,
                action: ()=>{
                    if(citeste){
                        dialogue_window_on('Iu... cine a lăsat aici tot gunoiul ăsta?')
                    }
                }
            },
            { x: 916, y: 377, w: 1227-916, h: 580-377,
                action: ()=>{
                    if(citeste){
                        if(cheie_usa){
                            dialogue_window_on('Cutia nu mai contine nimic util.')
                            return
                        }
                        if(ecran.style.backgroundImage === 'url("images/under_bed_end.png")'){
                            dialogue_window_on('Cotrobăind cu repulsie prin grămada de gunoi din cutie, ceva rece îmi atinge degetele.Împing mai multe hârtii... și acolo, în cel mai adânc colț, zăresc o cheie. Mică, metalică, dar diferită de cea de dinainte.')
                            cheie_usa = true
                            return
                        }
                        if(cheie_mica){
                            dialogue_window_on('Hmm... Cheia mica parcă se potrivește aici. Eu deschid cutia.')
                            ecran.style.backgroundImage = 'url("images/under_bed_end.png")'
                            scenes.under_bed.background = "images/under_bed_end.png"
                            return
                        }
                        dialogue_window_on('O cutie antică interesanta. Dar... e încuiata.')
                    }
                }
            },
            { x: 167, y: 597, w: 1369-167, h: 709-597,
                action: ()=>{
                    if(citeste) loadScene('second_room')
                }
            }
        ]
    },
    the_end: {
        background: 'images/the_end1.png',
        hotspots: [
            { x: 684, y: 203, w: 881-684, h: 525-203,
                action: ()=>{if(citeste){
                    if (end) {
                        document.title = 'FINAL!!!'
                        ecran.style.opacity = '0';
                        ecran.innerHTML = ''

                        setTimeout(() => {
                            ecran.style.backgroundImage = 'url("images/end.png")';
                            ecran.style.transition = 'opacity 2s ease-out';
                            ecran.style.opacity = '1';
                        }, 50);

                        // ecran.onclick = ()=>{
                            // ecran.innerHTML = 'CREDITE<br><br>DIRECTORI<br>Director Creativ<br>Haratov Raul<br>Director Artistic<br>Haratov Raul<br>Director Tehnic<br>Haratov Raul<br>Director Producție<br>Haratov Raul<br><br>DESIGN<br>Lead Game Designer<br>Haratov Raul<br>Level Designers<br>CheatGPT<br>Quest Design<br>Haratov Raul<br><br>PROGRAMARE<br>Lead Programmer<br>Haratov Raul<br>Gameplay Programmers<br>Haratov Raul<br><br>GRAFICĂ ȘI ANIMAȚIE<br>Art Director<br>Haratov Raul<br>Concept Art<br>Haratov Raul<br>ChatGpt<br><br>Cinematic Artists<br>Haratov Raul<br>Haratov Raul<br><br>SCENARIU ȘI POVESTE<br>Lead Writer<br>Haratov Raul<br>Writers<br>Haratov Raul<br>Lore & Worldbuilding<br>Haratov Raul<br><br>QA & TESTARE<br>QA Lead<br>Haratov Raul<br>Testeri<br>Haratov Raul<br><br>LOCALIZARE<br>Coordonator Localizare<br>Haratov Raul<br>Traducători<br>Haratov Raul (Română)<br><br>SPECIAL THANKS<br>Mulțumiri speciale pentru sprijinul acordat echipei Haratov Raul:<br>Haratov Raul<br>ChatGPT<br><br>🎉 Mulțumim că ai jucat !'
                        // }

                        setTimeout(()=> dialogue_window_on(`!!! Mulțumesc pentru joc !!!`), 3000)
                        return;
                    }
                    ecran.style.backgroundImage = 'url("images/the_end2.png")'
                    dialogue_window_on('Am ajuns prea departe ca să mai dau înapoi! Înca un pas și acest coșmar se va termina')
                    document.title = 'YOU WILL NEVER ESCAPE!!!'
                    end = true
                }
            }
            }
        ]
    }
  };

  function loadScene(name) {
    const scene = scenes[name];
    if (!scene) return;

    
    ecran.style.backgroundImage = `url(${scene.background})`;

    ecran.innerHTML = '';

    scene.hotspots.forEach(hotspot => {
      const div1 = document.createElement('div');
      div1.className = 'hotspot';
      div1.style.position = 'fixed';
      div1.style.cursor = 'pointer';
      div1.style.left = hotspot.x + 'px';
      div1.style.top = hotspot.y + 'px';
      div1.style.width = hotspot.w + 'px';
      div1.style.height = hotspot.h + 'px';
      div1.style.border = '3px solid rgb(255, 0, 0)'
      div1.onclick = hotspot.action;
      ecran.appendChild(div1);
    });
  }


function dialogue_window_on(text) {
    citeste = false
    let timeOuts = [];
    let dialogue_window;

    if (!document.getElementById('dialogue_window')) {
        const div = document.createElement('div');
        div.id = 'dialogue_window';
        div.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 1000px;
            height: 200px;
            border: 3px solid rgb(65, 65, 65);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: x-large;
            z-index: 9999;
            word-wrap: break-word;
            white-space: normal;
            overflow-y: auto;`;

        document.getElementById('ecran').appendChild(div);
        dialogue_window = div;
    } else {
        dialogue_window = document.getElementById('dialogue_window');
    }

    function text_animation(i) {
        dialogue_window.innerHTML += text.split('')[i];
    }

    for (let i = 0; i < text.length; i++) {
        let timeOut = setTimeout(() => {
            text_animation(i);
        }, i * 40);

        timeOuts.push(timeOut);
    }

    dialogue_window.addEventListener('click', () => {
        timeOuts.forEach(clearTimeout);
        dialogue_window.innerHTML = text;
        dialogue_window.addEventListener('click', () => {dialogue_window.remove(); citeste = true});
    });
}



loadScene('first_room')
dialogue_window_on('Când mi-am deschis ochii, o cameră necunoscută mă înconjura, iar în tăcerea ei plutea ceva greu de explicat — o prezență ciudată, aproape neliniștitoare.')



// let coordDisplay = document.createElement('div');
// coordDisplay.style.position = 'fixed';
// coordDisplay.style.left = '10px';
// coordDisplay.style.bottom = '10px';
// coordDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
// coordDisplay.style.color = 'white';
// coordDisplay.style.padding = '5px';
// coordDisplay.style.borderRadius = '3px';
// coordDisplay.style.fontSize = '14px';
// document.body.appendChild(coordDisplay);

// document.addEventListener('mousemove', function(event) {
//     let x = event.clientX;
//     let y = event.clientY;
//     coordDisplay.textContent = `X: ${x}, Y: ${y}`;
// });