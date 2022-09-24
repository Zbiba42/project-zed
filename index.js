let canvas =document.querySelector('canvas')
let c = canvas.getContext('2d')

canvas.width=innerWidth-4
canvas.height=innerHeight-4

let mouseX
let mouseY
canvas.addEventListener('mousemove',e=>{
     mouseX=e.clientX
     mouseY=e.clientY
})

class player{
    constructor({position}){
        this.position=position
        this.velocity={
            x:0,
            y:0
        }    
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,30,0,Math.PI*2,false)
        c.fillStyle= 'red'
        c.fill()
    }
    update(){
        this.draw()
        
        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
        
    }
}



let zed= new player({
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    }
})
let angle=0
let velocity={
    x:0,
    y:0
}
let lastX=0
let lastY=0


window.addEventListener('click',e=>{
    
    lastX=e.clientX
    lastY=e.clientY

    angle = Math.atan2(
        e.clientY - zed.position.y,
        e.clientX - zed.position.x
        )
    velocity= {
        x:Math.cos(angle)*3,
        y:Math.sin(angle)*3
    }
    zed.velocity.x=velocity.x
    zed.velocity.y=velocity.y
})

class Qspell{
    constructor({position,velocity,owner}){
        this.position=position
        this.velocity=velocity
        this.owner=owner
        this.dmg = 200
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,10,0,Math.PI*2,false)
        c.fillStyle= 'black'
        c.fill()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        
    }
}
var Qspells =[]
let poswhenQ
let qThrown = 0

class Wspell{
    constructor({position,velocity}){
        this.position=position
        this.velocity=velocity
        
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,30,0,Math.PI*2,false)
        c.fillStyle= 'hsl(0, 81%, 73%)'
        c.fill()
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

var Wspells =[]
let poswhenW
let wthrown = 0
let wCD =0
let wtraveled = false
let wpressed =0


// E SPELL 
var Espells =[]
let Ethrown = 0
let ECD =0

class Espell{
    constructor({position,raduis}){
        this.position=position
        this.raduis = raduis
        this.dmg = 100
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.raduis,0,Math.PI*2,false)
        c.fillStyle= 'black'
        c.fill()
    }
    update(){
        this.draw()
        if(this.raduis < 50){
            this.raduis +=10
        }else if( this.raduis >= 50){
            this.raduis -= 20
            
        }
    }
}
// dak li adrb
class poutch{
    constructor({position,health}){
        this.position=position
        this.health=health
    }
    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,50,0,Math.PI*2,false)
        c.fillStyle= 'blue'
        c.fill()
    }
    update(){
        this.draw()
        if(this.health<=0){
            console.log('poutch dead')
            setTimeout(() => {
                alert('F5 to restart')
            }, 200);
        }
        
        
    }
}

let poutch1 =new poutch({
    position:{
        x:500,
        y:500
    },
    health:1000
})

window.addEventListener('keydown',e=>{
    // Q SPELL
    if(e.key=='q'){
        if(Wspells.length ){
            if(wtraveled == true){
                if(qThrown <1){
                    poswhenQ=zed.position
                    qThrown +=1
                    const angle1 = Math.atan2(
                        mouseY - zed.position.y,
                        mouseX - zed.position.x
                        )
                    const velocity1= {
                        x:Math.cos(angle1)*5,
                        y:Math.sin(angle1)*5
                    }

                    
        
                    Qspells.push(
                        new Qspell({
                            position:{
                                x:zed.position.x,
                                y:zed.position.y
                            },
                            velocity:velocity1,
                            owner:'zed'
                        })
                    )
                    Wspells.forEach(wspell => {
                        const angle2 = Math.atan2(
                            mouseY - wspell.position.y,
                            mouseX - wspell.position.x
                            )
                        const velocity2= {
                            x:Math.cos(angle2)*5,
                            y:Math.sin(angle2)*5
                        }
                        Qspells.push(
                            new Qspell({
                                position:{
                                    x:wspell.position.x,
                                    y:wspell.position.y
                                },
                                velocity:velocity2,
                                owner:'clone'
                            })
                        )
                    });
                    
                    
                    
                    setTimeout(() => {
                        
                        qThrown=0
                    }, 5000);
                }else{
                    console.log('q on cd')
                }
            }
            
        }else{
            if(qThrown <1){
                poswhenQ=zed.position
               
                qThrown +=1
                const angle = Math.atan2(
                    mouseY - zed.position.y,
                    mouseX - zed.position.x
                    )
                const velocity= {
                    x:Math.cos(angle)*5,
                    y:Math.sin(angle)*5
                }
    
                Qspells.push(
                    new Qspell({
                        position:{
                            x:zed.position.x,
                            y:zed.position.y
                        },
                        velocity:velocity,
                        owner:'zed'
                    })
                )
                setTimeout(() => {
                    
                    qThrown=0
                }, 5000);
            }else{
                console.log('q on cd')
            }
        }
        
    }
    // W SPELL
    if(e.key=='w'){
        
            
            if(wthrown <2 ){
                if(wpressed ==0){
                    poswhenW=zed.position
                    wpressed +=1
                    
                    wthrown +=1
                    const angle = Math.atan2(
                        mouseY - zed.position.y,
                        mouseX - zed.position.x
                        )
                    const velocity= {
                        x:Math.cos(angle)*20,
                        y:Math.sin(angle)*20
                    }

                    Wspells.push(
                        new Wspell({
                            position:{
                                x:zed.position.x,
                                y:zed.position.y
                            },
                            velocity:velocity,
                        })
                    )
                    setTimeout(() => {
                        Wspells=[]
                        
                    }, 5250);
                    setTimeout(() => {
                        wpressed=0
                        wthrown=0
                    }, 10000);
                }else if(wpressed ==1){
                    wthrown +=1
                    let zedpos=zed.position
                    let wpos
                    Wspells.forEach(wspell=>{
                        wpos=wspell.position
                        wspell.position=zedpos
                    })
                    zed.position=wpos
                    wpressed=0
                    console.log('swap')
                }   
                    
            }else{
                console.log('w on cd')
            }
        
    }
    // STOP KEY
    if(e.key =='s'){
        zed.velocity.x=0
        zed.velocity.y=0
        console.log('S PRESSED')
    }
    // E SPELL
    if(e.key =='e'){
        if(ECD <1){
            if(Wspells.length >=1){
                if(wtraveled==true){
                    ECD +=1
                
                    Espells.push(
                        new Espell({
                            position:{
                                x:zed.position.x,
                                y:zed.position.y
                            },
                            raduis: 0
                        })
                    )
                    Wspells.forEach(wspell => {
                        Espells.push(
                            new Espell({
                                position:{
                                    x:wspell.position.x,
                                    y:wspell.position.y
                                },
                                raduis: 0
                            })
                        )
                    });
                    setTimeout(() => {
                        Espells= []
                    }, 90);
                    setTimeout(() => {
                        ECD=0
                    }, 4000);
                }
            }else{
                ECD +=1
                Espells.push(
                    new Espell({
                        position:{
                            x:zed.position.x,
                            y:zed.position.y
                        },
                        raduis: 0
                    })
                )
                setTimeout(() => {
                    Espells= []
                }, 90);
                setTimeout(() => {
                    ECD=0
                }, 4000);
            }
        }else{
            console.log('e on cd')
        }
    }
})



function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='white'
    c.fillRect(0,0,canvas.width,canvas.height)
    zed.update()
    poutch1.update()
    if(Math.floor(zed.position.x) == lastX || Math.floor(zed.position.y) == Math.floor(lastY)){
        
        zed.velocity.x=0
        zed.velocity.y=0
    }

    //Q SPELLS
    Qspells.forEach((spell) => {
        spell.update() 
        
        if(spell.owner=='zed'){
            const distance = Math.hypot(spell.position.x - poswhenQ.x,spell.position.y - poswhenQ.y);
            
            if(distance >250){
                Qspells= []
            }
        }
        
    });
    //W SPELLS
    Wspells.forEach((spell) => {
        spell.update() 
    
        const distance = Math.hypot(spell.position.x - poswhenW.x,spell.position.y - poswhenW.y);
        if(distance >250){
            wtraveled = true
            spell.velocity={
                x:0,
                y:0
            }
        }

    });
    // E SPELL
    Espells.forEach(Espell=>{
        Espell.update()
    })
    // q hits

    Qspells.forEach((Qspell,index)=>{
        if((Math.hypot(Qspell.position.x - poutch1.position.x, Qspell.position.y - poutch1.position.y)<50)){
            Qspells.splice(index,1)
            poutch1.health -=Qspell.dmg
            console.log('q hit current health ='+ poutch1.health)
        }
    })
    Espells.forEach((Espell,index)=>{
        if((Math.hypot(Espell.position.x - poutch1.position.x, Espell.position.y - poutch1.position.y)<=100)){
            Espells.splice(index,1)
            poutch1.health -=Espell.dmg
            console.log('e hit current health ='+ poutch1.health)
        }
    })
    }
animate()



