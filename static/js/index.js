// ১. মোবাইল মেনু টগল (Fixed)
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// ২. হিরো স্লাইডার
const heroSwiper = new Swiper('.heroSwiper', {
    loop: true,
    autoplay: { delay: 3000 },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    observer: true, // Swiper detect korbe PC/Mobile change hole
    observeParents: true,
});

// ৩. প্রোডাক্ট স্লাইডার ও ট্যাব
const swiper = new Swiper('.productSwiper', {
    on: {
        slideChange: function () {
            updateTabs(this.activeIndex);
        }
    }
});

function goToSlide(index) {
    swiper.slideTo(index);
}

function updateTabs(index) {
    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
}

// ৪. অর্ডার হ্যান্ডলার (Payment Request)
function handleOrder(price, itemName) {
    const confirmOrder = confirm(`${itemName}-এর জন্য ৳${price} পেমেন্ট করতে হবে। আপনি কি রাজি?`);
    if (confirmOrder) {
        alert("পেমেন্ট গেটওয়ে লোড হচ্ছে...");
        // Ekhane apni apnar payment backend link korte paren
    }
}

/**
 * Counter Animation Logic
 * @param {string} id - HTML element-এর ID
 * @param {number} start - শুরু হবে কত থেকে
 * @param {number} end - শেষ হবে কততে
 * @param {number} duration - কত সময় ধরে চলবে (milliseconds)
 */
function animateCounter(id, start, end, duration) {
    let obj = document.getElementById(id);
    if (!obj) return;
    
    let range = end - start;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        let value = Math.floor(progress * range + start);
        
        // কাউন্টার শেষে K+ বা + সাইন যোগ করার জন্য
        let suffix = (id === "customer-count") ? "K+" : "+";
        obj.innerHTML = value + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

// পেজ লোড হওয়ার পর কাউন্টার শুরু হবে
document.addEventListener('DOMContentLoaded', () => {
    // এখানে ১০ মানে ১০কে (10,000) আর ৫০০০ মানে ৫০০০ সেল
    animateCounter("customer-count", 0, 10, 2000); // ১০কে কাস্টমার
    animateCounter("sale-count", 0, 5000, 2000);  // ৫০০০+ সেল
});