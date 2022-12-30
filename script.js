const gunting = document.querySelector('#gunting');
const batu = document.querySelector('#batu');
const kertas = document.querySelector('#kertas');
const loveHand = document.querySelector('.loveHand');
const formSaran = document.querySelector('.formSaran');

const hasil = document.querySelector('.hasil h1');
const iconComp = document.querySelector('.comChoise .iconComp')
const choise = document.getElementsByClassName('choise');


// Fungsi untuk menentukan pilihan kopmputer
function compMemilih(){
    var pilihanComp = Math.random();
    if(pilihanComp < 0.33){
        iconComp.style.backgroundImage = "url('cut.png')";
        return 'gunting';
    } else if(pilihanComp >= 0.33 && pilihanComp < 0.66){
        iconComp.style.backgroundImage = "url('rock.png')";
        return 'batu';
    } else if(pilihanComp >= 0.66 && pilihanComp < 1){
        iconComp.style.backgroundImage = "url('paper.png')";
        return 'kertas';
    }
}


// Kata-kata Motivasi
const kata = [
    'Jika memang menyukaiku, tak perlu berbuat banyak. Cukup sebut namaku dalam doamu.',
    'Kalau engkau aku ibaratkan bulan purnama yang terbit, itu berarti aku mengurangi hakmu. Sebab engkau lebih indah dari itu.',
    'Kalau disuruh melupakanmu, aku akan ke kelurahan dulu. Minta surat keterangan tidak mampu.',
    'Aku tanpa kamu bagaikan ambulance tanpa uwiw uwiw.',
    'Ngemil apa yang paling enak? Ngemilikin kamu sepenuhnya.',
    'Aku rela ditangkap polisi asal tuduhannya atas pencurian hatimu.',
    'Aku bakalan berhenti cinta sama kamu kalau gajah sudah bisa terbang sendiri.',
    'Jika kamu tanya berapa kali kamu datang ke pikiranku, jujur saja, cuma sekali. Tapi sekali itu ngak pernah pergi-pergi',
    'Pepatah mengatakan, empat sehat lima sempurna. Namun, aku tidak merasakan kesempurnaan itu sebelum aku merasakan kasih sayangmu.',
    'Mencintaimu itu ibarat menghitung bintang di langit. Ya.. Buang-buang waktu saja. wkwkwk'
];
// Memilih kata-kata
const randomPilih = Math.floor(Math.random() * kata.length);
// const pilihanKata = kata[randomPilih];

var jmlKalah = 0;
var jmlMenang = 0;

// => fungsi saat kamu menang
function menang(){
    hasil.innerHTML = 'Menang';
    setTimeout(function(){
        iconComp.removeAttribute('style');
        iconComp.classList.add('kalahEye');
        setTimeout(function(){
            iconComp.classList.remove('kalahEye');
            iconComp.classList.add('normalEye');
        }, 4000);
    }, 2000);
    jmlMenang++;
}
// => fungsi saat kamu kalah
function kalah(){
    hasil.innerHTML = 'Kalah';
    setTimeout(function(){
        iconComp.removeAttribute('style');
        iconComp.classList.add('menangEye');
        setTimeout(function(){
            iconComp.classList.remove('menangEye');
            iconComp.classList.add('normalEye');
        }, 4000);
    }, 2000);
}
// => fungsi saat seri
function seri(){
    hasil.innerHTML = 'Seri';
    setTimeout(function(){
        iconComp.removeAttribute('style');
        iconComp.classList.add('seriEye');
        setTimeout(function(){
            iconComp.classList.remove('seriEye');
            iconComp.classList.add('normalEye');
        }, 3000);
    }, 2000);
}

// fungsi saat menang 3x
function menang3x(){
    if(jmlMenang === 3){
        setTimeout(function(){
            alert('Cie.. tiga kalimi menang!');
            alert('Sebagai hadiah, sini kukasi kata-kata');
            alert('Ekhem..');
            alert('Siap mako?');
            alert('Ini dia');
            const pilihanKata = kata[randomPilih];
            alert(pilihanKata);
            jmlMenang = 0;

            // konfirmasi suka tidaknya sama game ini
            var suka = confirm('gimana? suka ndak sama game ini?')
            if(suka){
                alert('Hehe.. makasi. Lanjut kuy..');
                loveHand.classList.remove('d-none');
                setTimeout(function(){
                    loveHand.classList.add('d-none');
                }, 4000);
            } else{
                alert('Hehe.. memang saya masih belajar.');
                formSaran.classList.remove('d-none');

                // mengirim data ke spreadsheet
                formSaran.addEventListener('submit', (e) => {
                    e.preventDefault();
                    document.querySelector("#mengirim").value = "Submiting..";
                    let data = new FormData(formSaran);
                    fetch('https://script.google.com/macros/s/AKfycbxSPE1iJlDw-0KRpOrktH6dJSvx16xjYIGlwmFd9bmbSc5wYO6QJt1TJPfwQOI7JZG6/exec', {
                            method: "POST",
                            body: data
                        })
                        .then(res => res.text())
                        .then( data => alert(data + '!!! Saran berhasil dikirim.'));
                    
                    // menghilankan tampilan form
                    setTimeout(function(){
                        formSaran.classList.add('d-none')
                    }, 2000);
                })
            }
        }, 3000);
    }
}

// Fungsi untuk menentukan siapa yang menang dan kalah
function penentuan(pilihanComp, pilihanUser){
    if(pilihanUser === pilihanComp){
        seri();
    } else if(pilihanComp === 'gunting' && pilihanUser === 'batu'){
        menang();
    } else if(pilihanComp === 'batu' && pilihanUser === 'kertas'){
        menang();
    } else if(pilihanComp === 'kertas' && pilihanUser === 'gunting'){
        menang();
    } else{
        kalah();
    }
}


// Fungsi yang akan dijalankan saat kamu memilih
function startPemilihan(pilihanUser){
    iconComp.classList.remove('normalEye');
    iconComp.classList.remove('kalahEye');
    iconComp.classList.remove('menangEye');
    iconComp.classList.remove('seriEye');

    var pilihanComp = compMemilih();
    penentuan(pilihanComp, pilihanUser);
}

// Event listener saat kamu memilih
gunting.addEventListener('click', function(){
    choise[0].classList.add('terpilih');
    choise[1].classList.remove('terpilih');
    choise[2].classList.remove('terpilih');
    
    var pilihanUser = 'gunting';
    startPemilihan(pilihanUser);
    menang3x();
});
batu.addEventListener('click', function(){
    choise[0].classList.remove('terpilih');
    choise[1].classList.add('terpilih');
    choise[2].classList.remove('terpilih');
    
    var pilihanUser = 'batu';
    startPemilihan(pilihanUser);
    menang3x();
});
kertas.addEventListener('click', function(){
    choise[0].classList.remove('terpilih');
    choise[1].classList.remove('terpilih');
    choise[2].classList.add('terpilih');
    
    var pilihanUser = 'kertas';
    startPemilihan(pilihanUser);
    menang3x();
});








// window.onload = () => {
    
// }






