$(document).ready(()=>{
    let $data =$('.data__wrapper');
    $('#personal-data').click(()=>{
        $data.innerHTML='';
        $data.load('../../pages/user-account/personal-data.html');
    });
    $('#changing-password').click(()=>{
        $data.innerHTML='';
        $data.load('../../pages/user-account/changing-password.html');
    });
    $('#memberships').click(()=>{
        $data.innerHTML='';
        $data.load('../../pages/user-account/memberships.html');
    })
})