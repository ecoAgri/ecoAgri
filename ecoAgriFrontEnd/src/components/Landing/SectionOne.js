import React, { useEffect } from 'react';
import LandingPageArticals from './LandingPageArticals';
import './animate.css';
import './home.css';
import './main.css';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import BenifitListItem from './BenifitListItem';
import LandingPageCarousel from './LandingPageCarousel';
function SectionOne() {
    useEffect(() => {
        var scroll = window.requestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60) };
        var elementsToShow = document.querySelectorAll('.show-on-scroll');
        function loop() {

            Array.prototype.forEach.call(elementsToShow, function (element) {
                if (isElementInViewport(element)) {
                    element.classList.add('is-visible');
                }
            });

            scroll(loop);
        }
        loop();

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                (rect.top <= 0
                    && rect.bottom >= 0)
                ||
                (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight))
                ||
                (rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }




        //SCROLL ANIMATE
        var scroll2 = window.requestAnimationFrame ||
            function (callback2) { window.setTimeout(callback2, 1000 / 60) };
        var elementsToShow2 = document.querySelectorAll('.show-on-scroll2');
        function loop2() {

            Array.prototype.forEach.call(elementsToShow2, function (element) {
                if (isElementInViewport(element)) {
                    element.classList.add('is-visible2');
                }
            });

            scroll2(loop2);
        }
        loop2();

        function isElementInViewport(el) {
            var rect2 = el.getBoundingClientRect();
            return (
                (rect2.top <= 0
                    && rect2.bottom >= 0)
                ||
                (rect2.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect2.top <= (window.innerHeight || document.documentElement.clientHeight))
                ||
                (rect2.top >= 0 &&
                    rect2.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }



        //SCROLL ANIMATE
        var scroll3 = window.requestAnimationFrame ||
            function (callback3) { window.setTimeout(callback3, 1000 / 60) };
        var elementsToShow3 = document.querySelectorAll('.show-on-scroll3');
        function loop3() {

            Array.prototype.forEach.call(elementsToShow3, function (element) {
                if (isElementInViewport(element)) {
                    element.classList.add('is-visible3');
                }
            });

            scroll3(loop3);
        }
        loop3();

        function isElementInViewport(el) {

            var rect3 = el.getBoundingClientRect();
            return (
                (rect3.top <= 0
                    && rect3.bottom >= 0)
                ||
                (rect3.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect3.top <= (window.innerHeight || document.documentElement.clientHeight))
                ||
                (rect3.top >= 0 &&
                    rect3.bottom <= (window.innerHeight || document.documentElement.clientHeight))
            );
        }


    }, [])
    return (
        <React.Fragment>
            <main className="main flex">
                <article className="padding_2x">
                    <h1 className="title big">The Online Farmer's market</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                    <a href="#solutions" className="btn2">Explore more</a>
                </article>
            </main>

            <Box sx={{ mt: 5 }}>
                <div className="sections section2" id="solutions" style={{ padding: 0, margin: 0 }}>
                    <div className="flex" style={{ padding: 0, margin: 0 }}>
                        <section className="flex-content padding_1x" style={{ padding: 0, margin: 0, marginLeft: 8 }}>
                            <em className="line inline-photo2 show-on-scroll2"></em>
                            <h1 className="title medium inline-photo3 show-on-scroll3"><em>Recent</em> Products</h1>
                        </section>
                    </div>
                    <LandingPageCarousel />
                </div>
            </Box>

            <div className="sections section1 flex" id="about">
                <section className="flex-content padding_2x">
                    <img src="assets/images/01.webp" alt="" loading="lazy" className="inline-photo2 show-on-scroll2" />
                </section>
                <section className="flex-content padding_2x">
                    <h1 className="title medium inline-photo3 show-on-scroll3">Our <em>Benifits.</em></h1>
                    <List>
                        <BenifitListItem title="Direct buying & selling" />
                        <BenifitListItem title="Secure payments" />
                        <BenifitListItem title="Connections with the Agricultural Experts" />
                        <BenifitListItem title="Donations to the community" />
                        <BenifitListItem title="Knowledge sharing" />
                    </List>
                </section>
            </div>


            <div className="sections section2" id="solutions">
                <div className="flex">
                    <section className="flex-content padding_1x">
                        <em className="line inline-photo2 show-on-scroll2"></em>
                        <h1 className="title medium inline-photo3 show-on-scroll3"><em>About</em> Us</h1>
                        <p>ecoAgri is a web-based solution that assists and guides farmers to minimize wastage of agri products. It help you to connect with Farmers, Buyers, Agri experts, & local businesses to improve your services within wide range of agriculture sector in Sri Lanka. Also you can connect with ‘ecoAgri’ to help people via charitable organizations.</p>
                    </section>
                </div>
            </div>

            <div className="sections section4 padding_1x" id="engagements">
                <div className="title_header">
                    <h1 className="title medium inline-photo2 show-on-scroll2">Most <em>Recent Articals</em></h1>
                    <p className="inline-photo3 show-on-scroll3">Our previous engagements include but are not limited to</p>
                </div>
                <LandingPageArticals />
            </div>


            <footer className="sections padding_2x">
                <section>
                    <a href="#">Home</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Privacy Policy</a>
                </section>
                <section>
                    <p>© 2022 ecoAgri || All rights reserved</p>
                </section>
            </footer>


            <a href="#" id="roll_back" className="animate"><i className="fa fa-angle-up"></i></a>
        </React.Fragment>
    )
}

export default SectionOne