// آدرس API شما
const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyjvuEm6Trv1SokGDrPUQK9dPJoDnzlTVvORxTYB9mgnomGcxdJgLadFSwGaz6EoDesoA/exec"; 

// سیستم اسلایدر تصاویر
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000); // تغییر هر 5 ثانیه

// سیستم چندزبانه
const translations = {
    en: {
        dir: "ltr", title: "Official Immigration Panel", login_header: "User Login",
        user_placeholder: "User Name", email_placeholder: "Email Address",
        pass_placeholder: "Password", case_placeholder: "Case Number",
        login_btn: "Login to Panel", err_userName: "❌ User not found",
        err_email: "❌ Email mismatch", err_password: "❌ Wrong password",
        err_caseNumber: "❌ Invalid case", empty_fields: "Please fill all fields.",
        loading_msg: "Welcome! Redirecting...", server_error: "Server Error! Check VPN.",
        f1_h: "Immigration Lawyers", f2_h: "Contracts", f3_h: "Support"
    },
    fa: {
        dir: "rtl", title: "پنل رسمی مهاجرتی", login_header: "ورود به پنل کاربری",
        user_placeholder: "نام کاربری", email_placeholder: "ایمیل",
        pass_placeholder: "رمز عبور", case_placeholder: "شماره کیس",
        login_btn: "ورود به پنل", err_userName: "❌ کاربر یافت نشد",
        err_email: "❌ ایمیل اشتباه است", err_password: "❌ رمز اشتباه است",
        err_caseNumber: "❌ کیس نامعتبر", empty_fields: "همه فیلدها را پر کنید.",
        loading_msg: "خوش آمدید! در حال انتقال...", server_error: "خطا! فیلترشکن را بررسی کنید.",
        f1_h: "وکلای مهاجرتی", f2_h: "قراردادها", f3_h: "پشتیبانی"
    },
    it: {
        dir: "ltr", title: "Panel Immigrazione", login_header: "Accesso Utente",
        user_placeholder: "Nome Utente", email_placeholder: "Email",
        pass_placeholder: "Password", case_placeholder: "Numero Pratica",
        login_btn: "Accedi", err_userName: "❌ Utente non trovato",
        err_email: "❌ Email errata", err_password: "❌ Password errata",
        err_caseNumber: "❌ Pratica non valida", empty_fields: "Compila tutti i campi.",
        loading_msg: "Benvenuto! Reindirizzamento...", server_error: "Errore! Controlla VPN.",
        f1_h: "Avvocati", f2_h: "Contratti", f3_h: "Supporto"
    }
};

let currentLang = 'en';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    
    document.getElementById('txt_title').innerText = t.title;
    document.getElementById('txt_login_header').innerText = t.login_header;
    document.getElementById('userName').placeholder = t.user_placeholder;
    document.getElementById('email').placeholder = t.email_placeholder;
    document.getElementById('password').placeholder = t.pass_placeholder;
    document.getElementById('caseNumber').placeholder = t.case_placeholder;
    document.getElementById('loginBtn').innerText = t.login_btn;
    
    document.getElementById('err_userName').innerText = t.err_userName;
    document.getElementById('err_email').innerText = t.err_email;
    document.getElementById('err_password').innerText = t.err_password;
    document.getElementById('err_caseNumber').innerText = t.err_caseNumber;
    
    document.getElementById('txt_footer_1_h').innerText = t.f1_h;
    document.getElementById('txt_footer_2_h').innerText = t.f2_h;
    document.getElementById('txt_footer_3_h').innerText = t.f3_h;
}

// دکمه ورود
document.getElementById('loginBtn').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const caseNumber = document.getElementById('caseNumber').value.trim();

    if (!userName || !email || !password || !caseNumber) {
        alert(translations[currentLang].empty_fields);
        return;
    }

    document.getElementById('loading').style.display = 'block';
    const url = `${GOOGLE_API_URL}?user=${encodeURIComponent(userName)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}&case=${encodeURIComponent(caseNumber)}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';
            if (data.success) {
                alert(translations[currentLang].loading_msg);
                window.location.href = "panel.html"; 
            } else {
                handleErrors(data.errors);
            }
        })
        .catch(() => {
            document.getElementById('loading').style.display = 'none';
            alert(translations[currentLang].server_error);
        });
});

function handleErrors(errors) {
    resetStyles();
    errors.forEach(id => {
        const fieldId = (id === 'password' || id === 'pass') ? 'password' : id;
        const el = document.getElementById(fieldId);
        const err = document.getElementById('err_' + fieldId);
        if (el) el.classList.add('invalid');
        if (err) err.style.display = 'block';
    });
}

function resetStyles() {
    ['userName', 'email', 'password', 'caseNumber'].forEach(id => {
        const el = document.getElementById(id);
        const err = document.getElementById('err_' + id);
        if (el) el.classList.remove('invalid');
        if (err) err.style.display = 'none';
    });
}

window.onload = () => changeLanguage('en');
