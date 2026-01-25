/**
 * Dig it Up - Main JavaScript
 * Directory Website Functionality
 */

$(document).ready(function() {
    'use strict';

    // ============================================
    // NAVIGATION
    // ============================================
    const $header = $('#header');
    const $navToggle = $('#navToggle');
    const $navMenu = $('#navMenu');

    // Mobile Navigation Toggle
    $navToggle.on('click', function() {
        $navMenu.toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $navMenu.find('a').on('click', function() {
        $navMenu.removeClass('active');
        $navToggle.removeClass('active');
    });

    // Header scroll effect
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    });

    // ============================================
    // SCROLL TO TOP
    // ============================================
    const $scrollTop = $('#scrollTop');

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $scrollTop.addClass('visible');
        } else {
            $scrollTop.removeClass('visible');
        }
    });

    $scrollTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    const $heroSearch = $('#heroSearch');
    const $heroSearchBtn = $('#heroSearchBtn');
    const $featuredTools = $('#featuredTools');

    // Hero Search
    function performSearch(query) {
        query = query.toLowerCase().trim();
        
        if (!query) {
            $('.tool-card').show();
            return;
        }

        $('.tool-card').each(function() {
            const $card = $(this);
            const title = $card.find('h3').text().toLowerCase();
            const description = $card.find('.tool-description').text().toLowerCase();
            const category = $card.data('category') || '';

            if (title.includes(query) || description.includes(query) || category.includes(query)) {
                $card.show();
            } else {
                $card.hide();
            }
        });
    }

    $heroSearchBtn.on('click', function() {
        performSearch($heroSearch.val());
    });

    $heroSearch.on('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch($(this).val());
        }
    });

    // Category page search
    const $categorySearch = $('#categorySearch');
    if ($categorySearch.length) {
        $categorySearch.on('keyup', function() {
            performSearch($(this).val());
        });
    }

    // ============================================
    // CATEGORY FILTERING
    // ============================================
    const $filterButtons = $('.filter-btn');

    $filterButtons.on('click', function() {
        const category = $(this).data('category');
        
        $filterButtons.removeClass('active');
        $(this).addClass('active');

        if (category === 'all') {
            $('.tool-card').show();
        } else {
            $('.tool-card').each(function() {
                if ($(this).data('category') === category) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    // ============================================
    // SORTING
    // ============================================
    const $sortSelect = $('#sortSelect');

    $sortSelect.on('change', function() {
        const sortBy = $(this).val();
        const $toolsContainer = $('.tools-grid');
        const $tools = $toolsContainer.find('.tool-card').get();

        $tools.sort(function(a, b) {
            switch(sortBy) {
                case 'name-asc':
                    return $(a).find('h3').text().localeCompare($(b).find('h3').text());
                case 'name-desc':
                    return $(b).find('h3').text().localeCompare($(a).find('h3').text());
                case 'earning-high':
                    return getEarningValue(b) - getEarningValue(a);
                case 'earning-low':
                    return getEarningValue(a) - getEarningValue(b);
                default:
                    return 0;
            }
        });

        $.each($tools, function(index, tool) {
            $toolsContainer.append(tool);
        });
    });

    function getEarningValue(element) {
        const earningText = $(element).find('.tool-earning span').text();
        const match = earningText.match(/\$(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    // ============================================
    // PAGINATION
    // ============================================
    const itemsPerPage = 9;
    let currentPage = 1;

    function initPagination() {
        const $toolsContainer = $('.tools-grid');
        const $tools = $toolsContainer.find('.tool-card');
        const totalItems = $tools.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages <= 1) {
            $('.pagination').hide();
            return;
        }

        renderPagination(totalPages);
        showPage(1);
    }

    function renderPagination(totalPages) {
        const $pagination = $('.pagination');
        if (!$pagination.length) return;

        $pagination.empty();

        // Previous button
        $pagination.append('<button class="prev-btn" data-testid="pagination-prev">&laquo;</button>');

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            $pagination.append(`<button class="page-btn${i === 1 ? ' active' : ''}" data-page="${i}" data-testid="pagination-${i}">${i}</button>`);
        }

        // Next button
        $pagination.append('<button class="next-btn" data-testid="pagination-next">&raquo;</button>');

        // Event handlers
        $('.prev-btn').on('click', function() {
            if (currentPage > 1) {
                showPage(currentPage - 1);
            }
        });

        $('.next-btn').on('click', function() {
            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }
        });

        $('.page-btn').on('click', function() {
            showPage($(this).data('page'));
        });
    }

    function showPage(page) {
        currentPage = page;
        const $tools = $('.tools-grid .tool-card');
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        $tools.hide();
        $tools.slice(start, end).show();

        // Update pagination buttons
        $('.page-btn').removeClass('active');
        $(`.page-btn[data-page="${page}"]`).addClass('active');

        // Update prev/next states
        $('.prev-btn').prop('disabled', page === 1);
        $('.next-btn').prop('disabled', page === Math.ceil($tools.length / itemsPerPage));

        // Scroll to tools section
        $('html, body').animate({
            scrollTop: $('.tools-grid').offset().top - 100
        }, 300);
    }

    // Initialize pagination if on category page
    if ($('.pagination').length) {
        initPagination();
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // ============================================
    // NEWSLETTER FORM
    // ============================================
    const $newsletterForm = $('#newsletterForm');

    $newsletterForm.on('submit', function(e) {
        e.preventDefault();
        
        const $input = $(this).find('input[type="email"]');
        const $button = $(this).find('button');
        const email = $input.val();

        if (!email) return;

        // Simulate form submission
        $button.text('Subscribing...').prop('disabled', true);

        setTimeout(function() {
            $button.text('Subscribed!');
            $input.val('');
            
            setTimeout(function() {
                $button.text('Subscribe').prop('disabled', false);
            }, 2000);
        }, 1000);
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    const $contactForm = $('#contactForm');

    $contactForm.on('submit', function(e) {
        e.preventDefault();
        
        const $button = $(this).find('button[type="submit"]');
        const formData = {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            subject: $('#contactSubject').val(),
            message: $('#contactMessage').val()
        };

        // Validate
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Simulate form submission
        $button.text('Sending...').prop('disabled', true);

        setTimeout(function() {
            $button.text('Message Sent!');
            $contactForm[0].reset();
            
            setTimeout(function() {
                $button.text('Send Message').prop('disabled', false);
            }, 2000);
        }, 1000);
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this).attr('href');
        if (target === '#') return;
        
        e.preventDefault();
        
        const $target = $(target);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 500);
        }
    });

    // ============================================
    // FAQ ACCORDION (Optional Enhancement)
    // ============================================
    $('.faq-item h3').on('click', function() {
        const $item = $(this).parent();
        const $content = $item.find('p');
        
        $item.toggleClass('active');
        $content.slideToggle(200);
    });

    // ============================================
    // TOOL CARD HOVER EFFECTS
    // ============================================
    $('.tool-card').on('mouseenter', function() {
        $(this).addClass('hovered');
    }).on('mouseleave', function() {
        $(this).removeClass('hovered');
    });

    // ============================================
    // PRINT FUNCTIONALITY
    // ============================================
    $('.print-btn').on('click', function(e) {
        e.preventDefault();
        window.print();
    });

    // ============================================
    // EXTERNAL LINK HANDLING
    // ============================================
    $('a[rel="nofollow"]').on('click', function() {
        // Track external link clicks (for analytics)
        const href = $(this).attr('href');
        console.log('External link clicked:', href);
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    $(document).on('keydown', function(e) {
        // ESC closes mobile menu
        if (e.key === 'Escape') {
            $navMenu.removeClass('active');
            $navToggle.removeClass('active');
        }
    });

    // ============================================
    // INITIALIZE TOOLTIPS (if needed)
    // ============================================
    $('[data-tooltip]').each(function() {
        const $el = $(this);
        const text = $el.data('tooltip');
        
        $el.on('mouseenter', function() {
            const $tooltip = $('<div class="tooltip">' + text + '</div>');
            $('body').append($tooltip);
            
            const offset = $el.offset();
            $tooltip.css({
                top: offset.top - $tooltip.outerHeight() - 10,
                left: offset.left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2)
            });
        }).on('mouseleave', function() {
            $('.tooltip').remove();
        });
    });

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c Dig it Up ', 'background: #16a34a; color: white; font-size: 16px; padding: 8px 16px; border-radius: 4px;');
    console.log('Unearth Your Earning Potential - https://digitup.com');

});
