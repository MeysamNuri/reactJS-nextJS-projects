import { isEmpty } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Profile = () => {
    const user=useSelector(state=>state.user)
    if(isEmpty(user)) return <Redirect to="/" />
    return ( 
        <>


        <main>
            <div class="container">
                <div class="user-account">
                    <div class="row">
                        <div class="col-md-3 col-sm-4 col-xs-12">
                            <aside>

                                <div class="avatar-layer">
                                    <div class="img-layer">
                                        <a href="" class="change-image"><i class="zmdi zmdi-edit"></i></a>
                                        <img src="images/pic/avatar.jpg" />
                                    </div>
                                    <div class="detail">
                                        <span>{user.fullname} </span>
                                        <span> عضویت : 01/01/1395 </span>
                                    </div>
                                </div>

                                <section>
                                    <header><h3> میز کار </h3></header>
                                    <div class="inner">
                                        <ul>
                                            <li><a href=""> مشاهده حساب کابری </a></li>
                                            <li><a href=""> ویرایش حساب کابری </a></li>
                                            <li><a href=""> تغییر رمز عبور </a></li>
                                            <li><a href=""> تنظیمات حساب کاربری </a></li>
                                            <li><a href=""> خروج از حساب کاربری </a></li>
                                        </ul>
                                    </div>
                                </section>
                            </aside>    
                        </div>
                        <div class="col-md-9 col-sm-8 col-xs-12">
                            <section class="user-account-content">
                                <header><h1> داشبورد </h1></header>
                                <div class="inner">
                                    <div class="account-information">
                                        <h3> اطلاعات کاربری </h3>
                                        <ul>
                                            <li> <i class="zmdi zmdi-account"></i> نام و نام خانوادگی : {user.fullname}  </li>
                                            <li> <i class="zmdi zmdi-assignment-account"></i> نام کاربری :  imadmadaeni </li>
                                            <li> <i class="zmdi zmdi-email"></i> ایمیل :{user.email} </li>
                                            <li> <i class="zmdi zmdi-calendar-check"></i> تاریخ عضویت : 01/01/1395 </li>
                                            <li> <i class="zmdi zmdi-smartphone-android"></i> شماره تماس : 0912000000 </li>
                                        </ul>
                                    </div>
                                </div>  
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>

      
        <footer>
            <div class="top-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <section class="list">
                                <header><h4> دسترسی سریع</h4></header>
                                <ul>
                                    <li><a href="">مشاهده تمامی دوره ها</a></li>
                                    <li><a href="">قوانین خرید از سایت </a></li>
                                    <li><a href="">راهنمای خرید از سایت </a></li>
                                    <li><a href="">همکاری با تاپ لرن </a></li>
                                    <li><a href="">کسب درآمد از تاپ لرن </a></li>
                                    <li><a href="">ماهنامه طراحی وب</a></li>
                                </ul>
                            </section>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <section class="list">
                                <header><h4> دسترسی سریع</h4></header>
                                <ul>
                                    <li><a href="">مشاهده تمامی دوره ها</a></li>
                                    <li><a href="">قوانین خرید از سایت </a></li>
                                    <li><a href="">راهنمای خرید از سایت </a></li>
                                    <li><a href="">همکاری با تاپ لرن </a></li>
                                    <li><a href="">کسب درآمد از تاپ لرن </a></li>
                                    <li><a href="">ماهنامه طراحی وب</a></li>
                                </ul>
                            </section>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <section class="list">
                                <header><h4> دسترسی سریع</h4></header>
                                <ul>
                                    <li><a href="">مشاهده تمامی دوره ها</a></li>
                                    <li><a href="">قوانین خرید از سایت </a></li>
                                    <li><a href="">راهنمای خرید از سایت </a></li>
                                    <li><a href="">همکاری با تاپ لرن </a></li>
                                    <li><a href="">کسب درآمد از تاپ لرن </a></li>
                                    <li><a href="">ماهنامه طراحی وب</a></li>
                                </ul>
                            </section>
                        </div>
                        <div class="col-md-3 col-sm-6 col-xs-12">
                            <section class="list">
                                <header><h4> دسترسی سریع</h4></header>
                                <ul>
                                    <li><a href="">مشاهده تمامی دوره ها</a></li>
                                    <li><a href="">قوانین خرید از سایت </a></li>
                                    <li><a href="">راهنمای خرید از سایت </a></li>
                                    <li><a href="">همکاری با تاپ لرن </a></li>
                                    <li><a href="">کسب درآمد از تاپ لرن </a></li>
                                    <li><a href="">ماهنامه طراحی وب</a></li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-footer">
                <div class="container">
                    <p>
                        تمامی حقوق مادی و معنوی این قالب متعلق به <a href=""> تاپ لرن </a> می باشد و هرگونه کپی برداری و انتشار غیر مجاز پیگرد قانونی دارد .
                    </p>
                </div>
            </div>
        </footer>
      </>
     );
}
 
export default Profile;