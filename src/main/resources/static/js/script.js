var isUserIdChecked = false;

function checkUsernameAvailability(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    var userId = document.getElementById("userId").value;
    var messageElement = document.getElementById("userIdAvailability");

    if (!userId) {
        messageElement.textContent = "아이디를 입력하세요.";
        return;
    }

    fetch("/userIdAvailability?userId=" + userId)
        .then(response => response.text())
        .then(data => {
            messageElement.textContent = data;
            if (data === "사용 가능한 아이디 입니다.") {
                messageElement.style.color = "green";
                isUserIdChecked = true; // 아이디가 사용 가능한 경우 true로 업데이트
            } else {
                messageElement.style.color = "red";
                isUserIdChecked = false; // 아이디가 이미 사용 중인 경우 false로 업데이트
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = "서버 오류 발생";
            messageElement.style.color = "red";
            isUserIdChecked = false; // 오류 발생 시도 false로 업데이트
        });
}

document.addEventListener("DOMContentLoaded", function() {
    var pwTextBox = document.getElementById("password");
    var userPwAvailability = document.getElementById("userPwAvailability");

    pwTextBox.addEventListener("blur", function() {
        var password = pwTextBox.value;
        if (!isValidPassword(password)) {
            userPwAvailability.textContent = "영문, 숫자, 특수기호를 조합하여 8자 이상으로 입력해 주세요.";
            userPwAvailability.style.color = "purple";
        } else {
            userPwAvailability.textContent = "";
        }
    });

        // 비밀번호 유효성 검사 함수
    function isValidPassword(password) {
            // 영문, 숫자, 특수문자 포함하여 8자 이상인지 확인
        var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
        return regex.test(password);
    }
});

function checkPasswordMatch() {
    var password = document.getElementById("password").value;
    var passwordCheck = document.getElementById("passwordCheck").value;
    var messageElement = document.getElementById("userPwCheck");

    if (passwordCheck !== "" && password === passwordCheck) {
        messageElement.innerText = "비밀번호가 일치합니다.";
        messageElement.style.color = "green"; // 파란색으로 텍스트 색상 변경
    } else if (passwordCheck !== "") {
        messageElement.innerText = "비밀번호가 일치하지 않습니다.";
        messageElement.style.color = "red"; // 빨간색으로 텍스트 색상 변경
    }
}

// 비밀번호 일치 여부 확인을 위해 두 개의 비밀번호 필드의 값이 변경될 때마다 호출
document.getElementById("password").addEventListener("input", checkPasswordMatch);
document.getElementById("passwordCheck").addEventListener("blur", checkPasswordMatch);

document.addEventListener("DOMContentLoaded", function() {
    var emailTextBox2 = document.getElementById("emailTextBox2");
    var emailSelectBox = document.getElementById("emailSelectBox");

    emailSelectBox.addEventListener("change", function() {
        var selectedOption = emailSelectBox.options[emailSelectBox.selectedIndex].value;
        if (selectedOption === "직접입력") {
            emailTextBox2.value = ""; // "직접입력"을 선택했을 때 두 번째 텍스트 상자의 내용을 지웁니다.
            emailTextBox2.disabled = false; // 텍스트 상자를 편집 가능하게 만듭니다.
            emailTextBox2.focus(); // 텍스트 상자로 포커스를 이동합니다.
        } else {
            emailTextBox2.value = selectedOption; // 다른 옵션을 선택했을 때 두 번째 텍스트 상자에 선택한 값이 표시됩니다.
            emailTextBox2.disabled = true; // 텍스트 상자를 편집 불가능하게 만듭니다.
        }
    });
});

function validateForm() {
    var userId = document.getElementById("userId").value;
    var password = document.getElementById("password").value;
    var passwordCheck = document.getElementById("passwordCheck").value;
    var name = document.getElementById("nameTextBox").value;
    var mobile1 = document.getElementById("mobileTextBox1").value;
    var mobile2 = document.getElementById("mobileTextBox2").value;
    var mobile3 = document.getElementById("mobileTextBox3").value;
    var email1 = document.getElementById("emailTextBox1").value;
    var email2 = document.getElementById("emailTextBox2").value;
    var termsCheckbox = document.getElementById("enterCheckbox2").checked;
    var privacyCheckbox = document.getElementById("enterCheckbox3").checked;

    // 아이디 중복 확인 여부 확인
    var userIdAvailability = document.getElementById("userIdAvailability").innerText.trim();

    if (!userId || !password || !passwordCheck || !name || !mobile1 || !mobile2 || !mobile3 || !email1 || !email2) {
        alert("필수 항목을 모두 작성해주세요.");
        return false;
    }

    if (!termsCheckbox) {
        alert("수강생 이용약관에 동의해주세요.");
        return false;
    }

    if (!privacyCheckbox) {
        alert("개인정보 수집 및 이용에 동의해주세요.");
        return false;
    }

    if (userIdAvailability !== "사용 가능한 아이디 입니다." && userIdAvailability !== "") {
        alert("이미 사용 중인 아이디입니다. 다른 아이디를 작성해주세요.");
        return false;
    }

    if (!isUserIdChecked) {
        alert("아이디 중복 확인을 해주세요.");
        return false;
    }

    // 비밀번호 확인
    if (password !== passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    // 비밀번호가 영문, 숫자, 특수기호를 조합하여 8자 이상인지 확인
    var passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("비밀번호는 영문, 숫자, 특수기호를 조합하여 8자 이상이어야 합니다.");
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    var enterCheckbox1 = document.getElementById("enterCheckbox1");
    var enterCheckbox2 = document.getElementById("enterCheckbox2");
    var enterCheckbox3 = document.getElementById("enterCheckbox3");
    var enterCheckbox4 = document.getElementById("enterCheckbox4");

    enterCheckbox1.addEventListener("change", function() {
        var isChecked = enterCheckbox1.checked;
        enterCheckbox2.checked = isChecked;
        enterCheckbox3.checked = isChecked;
        enterCheckbox4.checked = isChecked;
    });
});

window.addEventListener('pageshow', function(event) {
    var historyTraversal = event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2);
    if (historyTraversal) {
        // 페이지가 캐시되어 뒤로가기로 다시 보여질 때 폼 내용을 리셋합니다.
        var form = document.querySelector('form');
        form.reset();

        // 체크박스도 모두 체크를 해제합니다.
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
    }
});