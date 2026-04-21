// آدرس زیر را با لینک Web App خود (که به /exec ختم می‌شود) جایگزین کنید
const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyjvuEm6Trv1SokGDrPUQK9dPJoDnzlTVvORxTYB9mgnomGcxdJgLadFSwGaz6EoDesoA/exec"; 

document.getElementById('loginBtn').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const caseNumber = document.getElementById('caseNumber').value.trim();

    if (!userName || !email || !password || !caseNumber) {
        alert("لطفاً تمام فیلدها را پر کنید.");
        return;
    }

    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    // ایجاد یک URL با پارامترهای لازم
    const url = `${GOOGLE_API_URL}?user=${encodeURIComponent(userName)}&email=${encodeURIComponent(email)}&pass=${encodeURIComponent(password)}&case=${encodeURIComponent(caseNumber)}`;

    // استفاده از fetch با مدیریت خطای شبکه
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('خطای شبکه');
            return res.json();
        })
        .then(data => {
            loading.style.display = 'none';

            if (data.success) {
                resetStyles();
                alert('خوش آمدید! در حال انتقال به پنل...');
                window.location.href = "panel.html"; 
            } else {
                handleErrors(data.errors);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
            alert("خطا در برقراری ارتباط با سرور! \n۱. فیلترشکن را روشن کنید. \n۲. مطمئن شوید در Google Script دسترسی روی Anyone است.");
        });
});

function handleErrors(errors) {
    resetStyles();
    if (errors && errors.length > 0) {
        errors.forEach(id => {
            // اصلاح نام فیلد پسورد اگر در HTML با p کوچک است
            const fieldId = id === 'pass' ? 'password' : id; 
            const el = document.getElementById(fieldId);
            const errMsg = document.getElementById('err_' + fieldId);
            if (el) el.classList.add('invalid');
            if (errMsg) errMsg.style.display = 'block';
        });
    } else {
        alert("اطلاعات وارد شده در سیستم یافت نشد.");
    }
}

function resetStyles() {
    const fields = ['userName', 'email', 'password', 'caseNumber'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        const err = document.getElementById('err_' + id);
        if (el) el.classList.remove('invalid');
        if (err) err.style.display = 'none';
    });
}
