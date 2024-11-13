import React, { useEffect } from 'react'
import './swiper.less';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

function DASwiper({ config, content, handleClick }) {
    useEffect(() => {
        const _config = config;
        const mySwiper = new Swiper('.swiper-container', {
            ..._config,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            pagination: _config.pagination ? {
                el: '.swiper-pagination',
                clickable: true,
            } : {},
        })
    }, [config])
    
    return (
        <div class="swiper-container">
            <div class="swiper-wrapper">
                {content.map((item, index) => {
                    const { url, title, percent_off, real_price, Discounted_price } = item
                    return (
                        <div className="swiper-slide" key={index}>
                            <div className="item">
                                <span className="title">{title}</span>
                                <div className="product">
                                    <img src={url} alt={title} />
                                    <div className="percent_off">
                                        <span>%</span> <span>{percent_off}</span>
                                    </div>
                                </div>
                                <span className="real_price">{real_price} تومان</span>
                                <span className="Discounted_price">{Discounted_price} تومان</span>
                                <div className="request"><span>درخواست QR</span></div>
                            </div>
                        </div>

                    )
                }
                )
                }
                <div className="swiper-slide">
                    <div className="last_slide"
                        onClick={handleClick}>
                        <span>لیست کامل و جستجو در اقلام دارای تخفیف</span>
                        <span className="arrow_img"></span>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>

        </div>
    )
}

export default DASwiper
