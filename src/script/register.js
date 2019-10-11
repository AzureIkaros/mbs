class Register {
    constructor() {
        this.changecode = $('.changecode');
        this.code = $(".code");
        this.phone_email = $('.phone_email');
        this.coded = $('.coded');
        this.password = $('.password');
        this.password_second = $('.password_second');
        this.button = $('.button');
        this.checkbox = $('#checkbox');
        this.url = 'http://10.31.155.75/mbs/php/';

        this.flag = null;
        this.phone_flag = false;
        this.code_flag = false;
        this.password_flag = false;
        this.password_second_flag = false;
    }
    init() {
        this.code.html(this.getCode());
        this.changeCode();
        this.checkPhoneOrEmail();
        this.checkCode();
        this.checkPassword();
        this.checkPasswordAgain();
        this.submitData();

    }
    getRandom() {//获取英文和数字的随机asc码(48-57,65-90,97-122)
        let str = String.fromCharCode(Math.round(Math.random() * (122 - 47)) + 47);
        return /[0-9a-zA-Z]/.test(str) ? str : this.getRandom();
    }
    getCode() { //生成验证码
        let code = "";
        for (let i = 0; i < 4; i++) {
            code += this.getRandom();
        }
        return code;
    }
    changeCode() { //修改验证码
        let self = this;
        this.changecode.on('click', function () {
            self.code.html(self.getCode())
        })
    }

    // 手机号或邮箱的验证
    checkPhoneOrEmail() {
        let self = this;
        this.phone_email.on('blur', function () {
            let value = $(this).val();
            let phone_reg = /^1[3,4,5,7,8]\d{9}$/;
            let email_reg = /^[\w | \W]{2,}\@[\w | \W]{2,}\.[0-9a-zA-Z]{2,}$/;
            if (value != "") {
                if (phone_reg.test(value) || email_reg.test(value)) {
                    $('.phone_email_info').html('');
                    self.flag = phone_reg.test(value) ? 'phone' : 'email';
                    self.phone_flag = true;

                    //检测邮箱或手机号是否已存在
                    $.ajax({
                        type: 'post',
                        url: self.url + "check.php",
                        data: `${self.flag}=${self.phone_email.val()}`,
                        async: true
                    }).done(function (data) {
                        if (!data) {
                            $('.phone_email_info').html('');
                            self.phone_flag = true;
                        } else {
                            $('.phone_email_info').html('手机号或邮箱存在');
                            self.phone_flag = false;
                        }
                    })

                } else {
                    $('.phone_email_info').html('手机号或邮箱错误');
                    self.phone_flag = false;
                }
            } else {
                $('.phone_email_info').html('请输入手机号或邮箱');
                self.phone_flag = false;
            }
        })
    }

    //验证码验证
    checkCode() {
        let self = this;
        this.coded.on('blur', function () {
            let value = $(this).val();
            if (value != "") {
                if (value.toUpperCase() === self.code.html().toUpperCase()) {
                    $('.code_info').html('');
                    self.code_flag = true;
                } else {
                    $('.code_info').html('验证码输入错误');
                    self.code_flag = false;
                }
            } else {
                $('.code_info').html('请输入验证码');
                self.code_flag = false;
            }
        })
    }

    //密码验证
    checkPassword() {
        let self = this;
        this.password.on('blur', function () {
            let value = $(this).val();
            if (value != "") {
                if (self.passwordLen(value) == 0) {
                    $('.password_info').html('请输入长度为8-20密码');
                    self.password_flag = false;
                } else if (self.passwordLen(value) == 1 && self.passwordStrong(value) == 1) {
                    $('.password_info').html('密码强度不够');
                    self.password_flag = false;
                } else if (self.passwordLen(value) < 2 && self.passwordStrong(value) < 3) {
                    $('.password_info').html(`<i class="active">弱</i><i>中</i><i>强</i>`);
                    self.password_flag = true;
                } else if (self.passwordLen(value) <= 3 && self.passwordStrong(value) < 3) {
                    $('.password_info').html(`<i class="active">弱</i><i class="active">中</i><i>强</i>`);
                    self.password_flag = true;
                } else if (self.passwordLen(value) === 3 && self.passwordStrong(value) >= 3) {
                    $('.password_info').html(`<i class="active">弱</i><i class="active">中</i><i class="active">强</i>`);
                    self.password_flag = true;
                }
            } else {
                $('.password_info').html('请输入密码');
                self.password_flag = false;
            }
            self.password_flag = self.check() ? true : false;
            self.check() ? $('.password_second_info').html('') : $('.password_second_info').html('两次密码输入不一致');
        })
    }

    //第二次密码输入验证
    checkPasswordAgain() {
        let self = this;
        this.password_second.on('blur', function () {
            self.check();
        })
    }

    //密码相同验证
    check() {
        let password = this.password.val();
        let password_second = this.password_second.val();
        if (password === password_second) {
            $('.password_second_info').html('');
            this.password_second_flag = true;
            this.password_flag = true;
        } else {
            $('.password_second_info').html('两次密码输入不一致');
            this.password_second_flag = false;
        }
        return this.password_second_flag;
    }

    submitData() {
        let self = this;
        this.button.on('click', function () {
            if (self.checkbox.is(':checked')) {
                if (self.phone_flag && self.code_flag && self.password_flag && self.password_second_flag) {
                    $.ajax({
                        type: 'post',
                        url: self.url + "register.php",
                        data: `${self.flag}=${self.phone_email.val()}&password=${self.password.val()}`,
                        async: true
                    }).done(function (data) {
                        if (data) {
                            alert("注册成功,1秒后跳转到登录界面");
                            setTimeout(function () {
                                location.href = "http://10.31.155.75/mbs/src/login.html";
                            }, 1000);
                        }
                    })
                } else {
                    alert("信息输入错误,请修改后再提交");
                    return false;
                }
            } else {
                alert('请注意注册条款');
                return false;
            }
        })
    }

    //密码长度
    passwordLen(value) {
        if (value.length > 7) {
            if (value.length > 12) {
                if (value.length > 16) {
                    return 3;
                } else {
                    return 2;
                }
            } else {
                return 1;
            }
        } else {
            return 0;
        }
    }

    //密码强度
    passwordStrong(value) {
        let num = /\d/g;
        let lower = /[a-z]/g;
        let upper = /[A-Z]/g;
        let other = /[\W | \_]/g;
        let sum = 0;
        sum = num.test(value) ? ++sum : sum;
        sum = lower.test(value) ? ++sum : sum;
        sum = upper.test(value) ? ++sum : sum;
        sum = other.test(value) ? ++sum : sum;
        return sum;
    }
}
