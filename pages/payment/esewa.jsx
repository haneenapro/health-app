import React from 'react'

const esewa = () => {

    var path = "https://uat.esewa.com.np/epay/main";
    var params = {
        amt: 100,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 100,
        pid: "ee2c3ca1-696b-4cc5-a6be-2c40d929d453",
        scd: "EPAYTEST",
        su: "http://merchant.com.np/page/esewa_payment_success",
        fu: "http://merchant.com.np/page/esewa_payment_failed"
    }

    function post(path, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }
    return (
        <div>
            <form action="https://uat.esewa.com.np/epay/main" method="POST">
                <input value="100" name="tAmt" type="hidden" />
                <input value="90" name="amt" type="hidden" />
                <input value="5" name="txAmt" type="hidden" />
                <input value="2" name="psc" type="hidden" />
                <input value="3" name="pdc" type="hidden" />
                <input value="EPAYTEST" name="scd" type="hidden" />
                <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453" name="pid" type="hidden" />
                <input value="http://merchant.com.np/page/esewa_payment_success?q=su" type="hidden" name="su" />
                <input value="http://merchant.com.np/page/esewa_payment_failed?q=fu" type="hidden" name="fu" />
                <input value="Submit" type="submit" />
            </form>
        </div>
    )
}

export default esewa