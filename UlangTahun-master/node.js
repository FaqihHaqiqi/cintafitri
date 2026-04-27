// Auto play musik setelah halaman load
window.addEventListener('load', () => {
   setTimeout(() => {
      playBirthdaySong();
   }, 1000); // Delay 1 detik agar halaman load sempurna
});

// Auto rotate photos every 8 seconds
setInterval(() => {
   const randomIndex = Math.floor(Math.random() * 4);
   showActivePhoto(randomIndex);
   setTimeout(hideActivePhoto, 4000);
}, 8000);

// Fireworks (tetap sama tapi enhanced)
var rnd = Math.random;
let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
Object.assign(canvas.style, {
   position: 'fixed', width: '100%', height: '100%',
   zIndex: '1', pointerEvents: 'none'
});

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
let ctx = canvas.getContext('2d');

function vector(x, y) {
   this.x = x; this.y = y;
   this.add = v => { this.x += v.x; this.y += v.y; };
}

function particle(pos, vel) {
   this.pos = new vector(pos.x, pos.y);
   this.vel = vel; this.finish = false; this.start = 0;
   this.update = t => {
      if (t - this.start > 700) this.finish = true;
      else { this.pos.add(this.vel); this.vel.y += 0.25; }
   };
   this.draw = () => !this.finish && drawDot(this.pos.x, this.pos.y, 2.5);
}

function firework(x, y) {
   this.pos = new vector(x, y);
   this.vel = new vector(0, -rnd()*15-5);
   this.color = `hsl(${rnd()*360}, 100%, ${55+rnd()*25}%)`;
   this.size = 6; this.finish = false;
   let exParticles = [], exPLen = 150;
   
   this.update = t => {
      if (this.finish) return;
      if (this.vel.y < 0) {
         this.pos.add(this.vel); this.vel.y += 0.25;
      } else if (!exParticles.length) {
         for (let i = 0; i < exPLen; i++) {
            let a = (i/exPLen)*Math.PI*2, s = rnd()*12+3;
            exParticles.push(new particle(this.pos, new vector(Math.cos(a)*s, Math.sin(a)*s)));
            exParticles[i].start = t;
         }
      } else {
         let done = exParticles.filter(p => p.finish).length;
         exParticles.forEach(p => p.update(t));
         if (done === exPLen) this.finish = true;
      }
   };
   
   this.draw = () => {
      if (this.finish) return;
      ctx.fillStyle = this.color;
      this.vel.y < 0 ? 
         drawDot(this.pos.x, this.pos.y, this.size) : 
         exParticles.forEach(p => p.draw());
   };
}

function drawDot(x, y, s) {
   ctx.beginPath();
   ctx.arc(x, y, s, 0, Math.PI*2);
   ctx.fill(); ctx.closePath();
}

let fireworks = [];
function init() {
   for (let i = 0; i < 35; i++)
      fireworks.push(new firework(rnd()*canvas.width, canvas.height));
}

function draw(t) {
   ctx.fillStyle = 'rgba(0,0,0,0.3)';
   ctx.fillRect(0,0,canvas.width,canvas.height);
   
   fireworks.forEach((fw,i) => {
      fw.update(t);
      if (fw.finish) fireworks[i] = new firework(rnd()*canvas.width, canvas.height);
      fw.draw();
   });
   requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
   canvas.width = canvas.clientWidth;
   canvas.height = canvas.clientHeight;
});

init();
draw();

// 🎵 SCRIPT YOUTUBE PLAYER - HARI INI HARI ULANG TAHUNKU 🎵 (AUTO PLAY)
const playBtn = document.getElementById("playBtn");
const youtubePlayer = document.getElementById("youtube-player");
const iframe = youtubePlayer.querySelector('iframe');
let isPlaying = false;

function playBirthdaySong() {
   console.log("🎵 HARI INI HARI ULANG TAHUNKU - AUTO PLAY! 🎂");
   
   // Tampilkan YouTube player
   youtubePlayer.classList.add('show');
   
   // Update tombol (tetap bisa diklik untuk pause)
   playBtn.innerHTML = "🎉 LAGU ULANG TAHUN SEDANG NYANYI! 🎵";
   playBtn.style.background = "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)";
   playBtn.style.boxShadow = "0 0 30px rgba(255,107,53,0.9)";
   
   // Auto hide tombol setelah 3 detik
   setTimeout(() => {
      playBtn.style.display = "none";
   }, 3000);
   
   isPlaying = true;
}

// Event listener untuk tombol play (sekarang untuk pause)
playBtn.addEventListener("click", (e) => {
   e.stopPropagation();
   if (isPlaying) {
      // Pause functionality
      youtubePlayer.classList.remove('show');
      playBtn.style.display = "block";
      playBtn.innerHTML = "▶️ MAIN LAGI HARI INI HARI ULANG TAHUNKU";
      playBtn.style.background = "linear-gradient(45deg, #ff6b9d, #ff9ff3)";
      playBtn.style.boxShadow = "0 0 20px rgba(255,107,157,0.8)";
      isPlaying = false;
   }
});

// Pause/resume dengan tombol SPASI
document.addEventListener("keydown", (e) => {
   if (e.code === "Space") {
      e.preventDefault();
      if (isPlaying) {
         // Hide player dan show tombol lagi
         youtubePlayer.classList.remove('show');
         playBtn.style.display = "block";
         playBtn.innerHTML = "▶️ MAIN LAGI HARI INI HARI ULANG TAHUNKU";
         playBtn.style.background = "linear-gradient(45deg, #ff6b9d, #ff9ff3)";
         playBtn.style.boxShadow = "0 0 20px rgba(255,107,157,0.8)";
         isPlaying = false;
      } else {
         playBirthdaySong();
      }
   }
});

// Close player dengan ESC
document.addEventListener("keydown", (e) => {
   if (e.code === "Escape" && isPlaying) {
      youtubePlayer.classList.remove('show');
      playBtn.style.display = "block";
      playBtn.innerHTML = "▶️ HARI INI HARI ULANG TAHUNKU";
      playBtn.style.background = "linear-gradient(45deg, #ff6b9d, #ff9ff3)";
      playBtn.style.boxShadow = "0 0 20px rgba(255,107,157,0.8)";
      isPlaying = false;
   }
});