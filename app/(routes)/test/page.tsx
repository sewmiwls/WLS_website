"use client";
import React from 'react'

const TestEzidebiCallback = () => {
    React.useEffect(() => {
        fetch('/api/ezidebit', {
            method: 'POST',
            body: (() => {
                const formData = new FormData();
                formData.append('uref', 'DDR-1751603691881-981');
                formData.append('cref', 'exampleCref');
                formData.append('fname', 'John');
                formData.append('lname', 'Doe');
                formData.append('email', 'john.doe@example.com');
                formData.append('mobile', '1234567890');
                formData.append('addr', '123 Main St');
                formData.append('addr2', '');
                formData.append('suburb', 'Suburbia');
                formData.append('state', 'CA');
                formData.append('pcode', '90001');
                formData.append('rdate', '2024-06-01');
                formData.append('ramount', '100');
                formData.append('freq', 'monthly');
                formData.append('odate', '2024-06-01');
                formData.append('oamount', '100');
                formData.append('numpayments', '12');
                formData.append('totalamount', '1200');
                formData.append('method', 'card');
                return formData;
            })(),
        })
            .then(res => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (!res.ok) {
                    return res.text().then(text => { throw new Error(text); });
                }
            })
            .catch(err => {
                console.error('Failed to save payment:', err);
            });
    }, [])
  return (
    <div>TestEzidebiCallback</div>
  )
}

export default TestEzidebiCallback