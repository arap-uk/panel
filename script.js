// آدرس API گوگل اسکریپت یا SheetDB خود را اینجا قرار دهید
const GOOGLE_API_URL = "https://sheetdb.io/api/v1/a79xgaoroanlz"; 

document.getElementById('loginBtn').addEventListener('click', function() {
    const userName = document.getElementById('userName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const caseNumber = document.getElementById('caseNumber').value.trim();

    // بررسی خالی نبودن فیلدها قبل از ارسال
    if (!userName || !email || !password || !caseNumber) {
        alert("لطفاً تمام فیلدها را پر کنید.");
        return;
    }

    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    // ارسال تمام داده‌ها به صورت یکجا
    const params = new URLSearchParams({
        action: "fullLogin", // یک پارامتر برای تشخیص نوع درخواست در سمت سرور
        user: userName,
        email: email,
        pass: password,
        case: caseNumber
    });

    fetch(`${GOOGLE_API_URL}?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
            loading.style.display = 'none';

            if (data.success) {
                // در صورت درست بودن همه اطلاعات
                resetStyles();
                alert('خوش آمدید! در حال انتقال به پنل...');
                window.location.href = "panel.html"; 
            } else {
                // نمایش خطا روی فیلدهای نادرست بر اساس پاسخ سرور
                handleErrors(data.errors);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
            alert("خطا در برقراری ارتباط با سرور.");
        });
});

function handleErrors(errors) {
    // errors باید آرایه‌ای از نام فیلدهای اشتباه باشد، مثلاً ['email', 'pass']
    resetStyles();
    if (errors && errors.length > 0) {
        errors.forEach(id => {
            const el = document.getElementById(id);
            const errMsg = document.getElementById('err_' + id);
            if (el) el.classList.add('invalid');
            if (errMsg) errMsg.style.display = 'block';
        });
    } else {
        alert("اطلاعات وارد شده با هم مطابقت ندارند.");
    }
}

function resetStyles() {
    const fields = ['userName', 'email', 'password', 'caseNumber'];
    fields.forEach(id => {
        document.getElementById(id).classList.remove('invalid');
        document.getElementById('err_' + id).style.display = 'none';
    });
}
