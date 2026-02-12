/**
 * SysZone Solution - AI Agent Services Website
 * Interactive JavaScript Functionality
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');

// Chat Elements
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');
const clearChatBtn = document.getElementById('clearChat');
const quickReplies = document.querySelectorAll('.quick-reply');

// Selector Elements
const businessType = document.getElementById('businessType');
const businessGoal = document.getElementById('businessGoal');
const platform = document.getElementById('platform');
const generateBtn = document.getElementById('generateRecommendation');
const recommendationResult = document.getElementById('recommendationResult');

// Pricing Elements
const conversationSlider = document.getElementById('conversationSlider');
const sliderValue = document.getElementById('sliderValue');

// Modal Elements
const consultationModal = document.getElementById('consultationModal');
const bookConsultationBtn = document.getElementById('bookConsultation');
const modalClose = document.getElementById('modalClose');
const consultationForm = document.getElementById('consultationForm');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// NAVIGATION
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// TYPEWRITER ANIMATION
// ============================================
const typewriterTexts = [
    'Customer Support AI Agent',
    'Sales Automation Agent',
    'WhatsApp AI Agent',
    'Lead Generation AI Agent'
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentText = typewriterTexts[typewriterIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter animation
typeWriter();

// ============================================
// CHAT INTERFACE
// ============================================

// AI Response Database
const aiResponses = {
    'hello': 'Hello! 👋 Welcome to SysZone Solution. How can I help you today?',
    'hi': 'Hi there! 👋 Ready to transform your business with AI?',
    'hey': 'Hey! 🚀 What can I do for you?',
    
    'services': 'We offer:\n• Customer Support AI Agents\n• Sales Automation\n• WhatsApp AI Integration\n• Lead Generation Bots\n• Custom AI Development\n\nWhich service interests you?',
    'what services do you offer?': 'We offer:\n• Customer Support AI Agents\n• Sales Automation\n• WhatsApp AI Integration\n• Lead Generation Bots\n• Custom AI Development\n\nWhich service interests you?',
    
    'price': 'Our pricing starts at $99/month for the Starter plan. The Pro plan at $299/month is our most popular option. Would you like to see our full pricing?',
    'pricing': 'Our pricing starts at $99/month for the Starter plan. The Pro plan at $299/month is our most popular option. Would you like to see our full pricing?',
    'how much does it cost?': 'Our pricing starts at $99/month for the Starter plan. The Pro plan at $299/month is our most popular option. Would you like to see our full pricing?',
    'cost': 'Our pricing starts at $99/month for the Starter plan. The Pro plan at $299/month is our most popular option. Would you like to see our full pricing?',
    
    'demo': 'You can try our live demo right here! Just type any question or click on the quick replies below. 🎯',
    'try demo': 'You can try our live demo right here! Just type any question or click on the quick replies below. 🎯',
    
    'consultation': 'Great choice! 🎉 Click on "Book Free Consultation" button or fill out the form at the bottom of the page. We\'ll get back to you within 24 hours!',
    'book': 'Great choice! 🎉 Click on "Book Free Consultation" button or fill out the form at the bottom of the page. We\'ll get back to you within 24 hours!',
    'book a consultation': 'Great choice! 🎉 Click on "Book Free Consultation" button or fill out the form at the bottom of the page. We\'ll get back to you within 24 hours!',
    'book demo': 'Great choice! 🎉 Click on "Book Free Consultation" button or fill out the form at the bottom of the page. We\'ll get back to you within 24 hours!',
    
    'whatsapp': 'Our WhatsApp AI Agent can handle customer inquiries, send automated responses, and even process orders 24/7! 📱 Would you like to learn more?',
    'support': 'Our Customer Support AI can handle 80% of common inquiries automatically, freeing your team to focus on complex issues. 💪',
    'sales': 'Our Sales Automation Agent qualifies leads, answers product questions, and guides customers through the buying process! 💰',
    'lead': 'Our Lead Generation AI captures visitor information, qualifies prospects, and schedules follow-ups automatically! 🎯',
    
    'contact': 'You can reach us at:\n📧 hello@syszonesolution.com\n📞 +1 (555) 123-4567\n💬 Or chat with us on WhatsApp!',
    'help': 'I can help you with:\n• Information about our services\n• Pricing details\n• Booking a consultation\n• Technical questions\n\nWhat would you like to know?',
    
    'default': 'That\'s interesting! 🤔 For detailed information about that, I recommend booking a free consultation with our team. Would you like to do that?'
};

// Get AI response
function getAIResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for exact matches first
    if (aiResponses[lowerMessage]) {
        return aiResponses[lowerMessage];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key) && key !== 'default') {
            return response;
        }
    }
    
    return aiResponses['default'];
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Convert newlines to HTML
    const formattedText = text.replace(/\n/g, '<br>');
    contentDiv.innerHTML = formattedText;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = 'Just now';
    contentDiv.appendChild(timeSpan);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get and display AI response after delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response);
    }, 1500);
}

// Event listeners for chat
sendMessageBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick replies
quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
        chatInput.value = btn.dataset.message;
        sendMessage();
    });
});

// Clear chat
clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>Chat cleared! 👋 How can I help you today?</p>
                <span class="message-time">Just now</span>
            </div>
        </div>
    `;
});

// ============================================
// AI AGENT SELECTOR TOOL
// ============================================

const agentRecommendations = {
    realestate: {
        sales: {
            name: 'Property Sales Assistant',
            description: 'An intelligent AI agent that qualifies potential buyers, schedules property viewings, and provides instant property information 24/7.',
            features: [
                'Property search and filtering',
                'Virtual tour scheduling',
                'Buyer qualification',
                'Price negotiation support'
            ],
            price: '$349/month'
        },
        support: {
            name: 'Real Estate Support Agent',
            description: 'Handles all tenant and buyer inquiries, from maintenance requests to contract questions, with instant accurate responses.',
            features: [
                '24/7 tenant support',
                'Maintenance request handling',
                'Contract FAQ automation',
                'Emergency response routing'
            ],
            price: '$299/month'
        },
        leads: {
            name: 'Lead Capture Pro',
            description: 'Captures and qualifies leads from your website and social media, ensuring no potential client slips through the cracks.',
            features: [
                'Multi-platform lead capture',
                'Automatic lead scoring',
                'Instant follow-up messages',
                'CRM integration'
            ],
            price: '$399/month'
        },
        automation: {
            name: 'Real Estate Automation Suite',
            description: 'Complete automation for your real estate business - from listing updates to appointment scheduling.',
            features: [
                'Listing management',
                'Appointment scheduling',
                'Document collection',
                'Follow-up sequences'
            ],
            price: '$499/month'
        },
        engagement: {
            name: 'Client Engagement Bot',
            description: 'Keeps your clients engaged with personalized property recommendations and market updates.',
            features: [
                'Personalized recommendations',
                'Market update alerts',
                'Neighborhood insights',
                'Price drop notifications'
            ],
            price: '$279/month'
        }
    },
    ecommerce: {
        sales: {
            name: 'Sales Conversion Pro',
            description: 'Boosts your sales with personalized product recommendations and instant answers to customer questions.',
            features: [
                'Product recommendations',
                'Abandoned cart recovery',
                'Discount code distribution',
                'Upsell suggestions'
            ],
            price: '$299/month'
        },
        support: {
            name: 'E-commerce Support Hero',
            description: 'Handles order tracking, returns, refunds, and product questions automatically around the clock.',
            features: [
                'Order status tracking',
                'Return & refund handling',
                'Size/fit guidance',
                'Shipping information'
            ],
            price: '$249/month'
        },
        leads: {
            name: 'Shopper Intent Capture',
            description: 'Identifies high-intent shoppers and guides them through the purchase journey with personalized assistance.',
            features: [
                'Browse behavior analysis',
                'Exit intent capture',
                'Personalized offers',
                'Wishlist reminders'
            ],
            price: '$349/month'
        },
        automation: {
            name: 'Store Automation Master',
            description: 'Complete store automation from inventory alerts to customer follow-ups and review requests.',
            features: [
                'Inventory alerts',
                'Review requests',
                'Reorder reminders',
                'Customer segmentation'
            ],
            price: '$449/month'
        },
        engagement: {
            name: 'Customer Engagement Pro',
            description: 'Keeps customers engaged with personalized content, loyalty rewards, and exclusive offers.',
            features: [
                'Loyalty program integration',
                'Birthday rewards',
                'Exclusive early access',
                'Personalized content'
            ],
            price: '$279/month'
        }
    },
    clinic: {
        sales: {
            name: 'Healthcare Services Guide',
            description: 'Helps patients discover and book the right services with intelligent recommendations.',
            features: [
                'Service information',
                'Treatment explanations',
                'Package recommendations',
                'Insurance guidance'
            ],
            price: '$299/month'
        },
        support: {
            name: 'Medical Support Assistant',
            description: 'Provides instant answers to patient questions about procedures, preparation, and post-care instructions.',
            features: [
                'Pre-visit instructions',
                'Post-care guidance',
                'Medication reminders',
                'FAQ automation'
            ],
            price: '$349/month'
        },
        leads: {
            name: 'Patient Acquisition Pro',
            description: 'Captures potential patients from your website and nurtures them until they\'re ready to book.',
            features: [
                'Symptom checker',
                'Doctor matching',
                'Appointment scheduling',
                'Follow-up care'
            ],
            price: '$399/month'
        },
        automation: {
            name: 'Clinic Workflow Automation',
            description: 'Automates appointment reminders, follow-ups, and patient communications end-to-end.',
            features: [
                'Appointment reminders',
                'Confirmation requests',
                'No-show follow-up',
                'Recall campaigns'
            ],
            price: '$449/month'
        },
        engagement: {
            name: 'Patient Engagement Bot',
            description: 'Keeps patients engaged with health tips, appointment reminders, and wellness content.',
            features: [
                'Health tips & articles',
                'Wellness reminders',
                'Seasonal campaigns',
                'Patient education'
            ],
            price: '$279/month'
        }
    },
    education: {
        sales: {
            name: 'Course Enrollment Assistant',
            description: 'Guides prospective students through course selection and enrollment with personalized recommendations.',
            features: [
                'Course recommendations',
                'Prerequisite checking',
                'Career path guidance',
                'Enrollment assistance'
            ],
            price: '$279/month'
        },
        support: {
            name: 'Student Support Agent',
            description: 'Provides 24/7 support for student questions about courses, schedules, and campus resources.',
            features: [
                'Course information',
                'Schedule assistance',
                'Resource navigation',
                'Technical support'
            ],
            price: '$249/month'
        },
        leads: {
            name: 'Student Recruitment Pro',
            description: 'Captures and nurtures prospective students from inquiry to enrollment.',
            features: [
                'Inquiry capture',
                'Campus tour booking',
                'Application guidance',
                'Deadline reminders'
            ],
            price: '$349/month'
        },
        automation: {
            name: 'Education Automation Suite',
            description: 'Automates student communications, assignment reminders, and administrative tasks.',
            features: [
                'Assignment reminders',
                'Grade notifications',
                'Attendance alerts',
                'Parent communications'
            ],
            price: '$399/month'
        },
        engagement: {
            name: 'Student Engagement Bot',
            description: 'Keeps students engaged with learning resources, events, and community updates.',
            features: [
                'Study resources',
                'Event notifications',
                'Club information',
                'Achievement celebrations'
            ],
            price: '$229/month'
        }
    },
    agency: {
        sales: {
            name: 'Agency Sales Closer',
            description: 'Qualifies prospects, presents your services, and guides them to book a strategy call.',
            features: [
                'Service presentations',
                'Case study sharing',
                'Proposal generation',
                'Meeting scheduling'
            ],
            price: '$349/month'
        },
        support: {
            name: 'Client Support Agent',
            description: 'Handles client questions about campaigns, reports, and project updates instantly.',
            features: [
                'Campaign updates',
                'Report explanations',
                'Ticket management',
                'Escalation routing'
            ],
            price: '$299/month'
        },
        leads: {
            name: 'Lead Gen Powerhouse',
            description: 'Captures and qualifies leads from all your marketing channels automatically.',
            features: [
                'Multi-channel capture',
                'Lead scoring',
                'Instant follow-up',
                'CRM sync'
            ],
            price: '$399/month'
        },
        automation: {
            name: 'Agency Automation Pro',
            description: 'Automates client onboarding, reporting, and campaign management workflows.',
            features: [
                'Onboarding sequences',
                'Report delivery',
                'Review requests',
                'Renewal reminders'
            ],
            price: '$499/month'
        },
        engagement: {
            name: 'Client Engagement Bot',
            description: 'Keeps clients engaged with industry insights, campaign ideas, and success stories.',
            features: [
                'Industry news sharing',
                'Campaign suggestions',
                'Success stories',
                'Trend alerts'
            ],
            price: '$279/month'
        }
    },
    restaurant: {
        sales: {
            name: 'Order & Reservation Assistant',
            description: 'Takes orders, reservations, and answers menu questions to boost your revenue.',
            features: [
                'Online ordering',
                'Table reservations',
                'Menu recommendations',
                'Special offers'
            ],
            price: '$249/month'
        },
        support: {
            name: 'Dining Support Agent',
            description: 'Handles dietary questions, hours, location info, and special requests.',
            features: [
                'Dietary information',
                'Hours & location',
                'Private events',
                'Catering inquiries'
            ],
            price: '$199/month'
        },
        automation: {
            name: 'Restaurant Automation',
            description: 'Automates reservations, order confirmations, and customer feedback collection.',
            features: [
                'Booking confirmations',
                'Order updates',
                'Feedback requests',
                'Loyalty rewards'
            ],
            price: '$299/month'
        }
    },
    consulting: {
        sales: {
            name: 'Consultation Booker Pro',
            description: 'Qualifies prospects and books consultation calls with your team.',
            features: [
                'Prospect qualification',
                'Calendar integration',
                'Pre-call questionnaires',
                'Reminder sequences'
            ],
            price: '$299/month'
        },
        support: {
            name: 'Client Care Agent',
            description: 'Supports existing clients with questions about services, deliverables, and timelines.',
            features: [
                'Service information',
                'Deliverable updates',
                'Timeline answers',
                'Resource sharing'
            ],
            price: '$249/month'
        },
        automation: {
            name: 'Consulting Automation',
            description: 'Automates client communications, proposal follow-ups, and project updates.',
            features: [
                'Proposal follow-ups',
                'Project updates',
                'Invoice reminders',
                'Testimonial requests'
            ],
            price: '$349/month'
        }
    }
};

// Default recommendation for missing combinations
const defaultRecommendation = {
    name: 'Smart Business Assistant',
    description: 'A versatile AI agent tailored to your business needs, providing 24/7 automated customer interactions and support.',
    features: [
        '24/7 automated responses',
        'Multi-platform integration',
        'Custom training available',
        'Analytics dashboard'
    ],
    price: '$299/month'
};

// Generate recommendation
generateBtn.addEventListener('click', () => {
    const type = businessType.value;
    const goal = businessGoal.value;
    
    if (!type || !goal) {
        showToast('Please select both business type and goal', 'error');
        return;
    }
    
    // Get recommendation
    let recommendation = defaultRecommendation;
    if (agentRecommendations[type] && agentRecommendations[type][goal]) {
        recommendation = agentRecommendations[type][goal];
    }
    
    // Update result card
    document.getElementById('agentName').textContent = recommendation.name;
    document.getElementById('agentDescription').textContent = recommendation.description;
    document.getElementById('agentPrice').textContent = recommendation.price;
    
    const featuresList = document.getElementById('agentFeatures');
    featuresList.innerHTML = recommendation.features.map(feature => 
        `<li><i class="fas fa-check"></i> ${feature}</li>`
    ).join('');
    
    // Show result
    recommendationResult.classList.add('show');
    
    // Scroll to result
    recommendationResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ============================================
// USE CASE SIMULATION
// ============================================

const useCaseData = {
    realestate: {
        title: 'Real Estate AI Agent',
        description: 'See how our AI transforms property inquiries into qualified leads',
        steps: [
            { icon: 'fa-home', title: 'User Inquiry', desc: 'Visitor asks about properties' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-brain', title: 'AI Processing', desc: 'Agent qualifies budget & needs' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-calendar-check', title: 'Task Completed', desc: 'Viewing scheduled in CRM' }
        ],
        benefits: [
            { value: '70%', label: 'Faster Response' },
            { value: '3x', label: 'More Leads' },
            { value: '24/7', label: 'Availability' }
        ]
    },
    ecommerce: {
        title: 'E-commerce AI Agent',
        description: 'Watch how AI turns browsers into buyers with personalized assistance',
        steps: [
            { icon: 'fa-shopping-cart', title: 'Customer Browse', desc: 'Visitor explores products' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-brain', title: 'AI Processing', desc: 'Recommendations & support' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-check-circle', title: 'Task Completed', desc: 'Order placed successfully' }
        ],
        benefits: [
            { value: '40%', label: 'Higher Conversion' },
            { value: '50%', label: 'Less Cart Abandon' },
            { value: '24/7', label: 'Support' }
        ]
    },
    healthcare: {
        title: 'Healthcare AI Agent',
        description: 'Experience seamless patient scheduling and support automation',
        steps: [
            { icon: 'fa-user-injured', title: 'Patient Inquiry', desc: 'Patient needs appointment' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-brain', title: 'AI Processing', desc: 'Symptoms & scheduling' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-calendar-alt', title: 'Task Completed', desc: 'Appointment confirmed' }
        ],
        benefits: [
            { value: '80%', label: 'Fewer No-shows' },
            { value: '60%', label: 'Time Saved' },
            { value: '24/7', label: 'Booking' }
        ]
    },
    education: {
        title: 'Education AI Agent',
        description: 'See how AI guides students from inquiry to enrollment',
        steps: [
            { icon: 'fa-graduation-cap', title: 'Student Inquiry', desc: 'Prospective student asks' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-brain', title: 'AI Processing', desc: 'Course matching & info' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-file-signature', title: 'Task Completed', desc: 'Application submitted' }
        ],
        benefits: [
            { value: '50%', label: 'More Enrollments' },
            { value: '90%', label: 'Query Resolution' },
            { value: '24/7', label: 'Support' }
        ]
    },
    marketing: {
        title: 'Marketing Agency AI',
        description: 'Watch AI qualify leads and book strategy calls automatically',
        steps: [
            { icon: 'fa-bullhorn', title: 'Lead Arrives', desc: 'Prospect shows interest' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-brain', title: 'AI Processing', desc: 'Qualification & nurturing' },
            { icon: 'fa-arrow-right', arrow: true },
            { icon: 'fa-handshake', title: 'Task Completed', desc: 'Call booked in calendar' }
        ],
        benefits: [
            { value: '3x', label: 'Lead Conversion' },
            { value: '70%', label: 'Time Saved' },
            { value: '24/7', label: 'Qualification' }
        ]
    }
};

const workflowContent = document.getElementById('workflowContent');
const industryTabs = document.querySelectorAll('.industry-tab');

function renderWorkflow(industry) {
    const data = useCaseData[industry];
    
    workflowContent.innerHTML = `
        <div class="workflow-header">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
        </div>
        <div class="workflow-steps">
            ${data.steps.map(step => {
                if (step.arrow) {
                    return `<div class="workflow-arrow"><i class="fas ${step.icon}"></i></div>`;
                }
                return `
                    <div class="workflow-step">
                        <div class="step-icon">
                            <i class="fas ${step.icon}"></i>
                        </div>
                        <span class="step-title">${step.title}</span>
                        <span class="step-desc">${step.desc}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="workflow-benefits">
            ${data.benefits.map(benefit => `
                <div class="benefit-item">
                    <div class="benefit-value">${benefit.value}</div>
                    <div class="benefit-label">${benefit.label}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// Industry tab click handlers
industryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        industryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Render workflow
        renderWorkflow(tab.dataset.industry);
    });
});

// Initial render
renderWorkflow('realestate');

// ============================================
// PRICING SLIDER
// ============================================

const pricingTiers = {
    starter: { basePrice: 99, baseConversations: 1000, pricePer100: 5 },
    pro: { basePrice: 299, baseConversations: 5000, pricePer100: 8 },
    enterprise: { basePrice: 799, baseConversations: 20000, pricePer100: 15 }
};

function updatePricing() {
    const conversations = parseInt(conversationSlider.value);
    sliderValue.textContent = conversations.toLocaleString();
    
    // Update Starter
    const starterExtra = Math.max(0, conversations - pricingTiers.starter.baseConversations);
    const starterExtraCost = Math.ceil(starterExtra / 100) * pricingTiers.starter.pricePer100;
    const starterTotal = pricingTiers.starter.basePrice + starterExtraCost;
    document.getElementById('starterPrice').textContent = starterTotal;
    document.getElementById('starterConversations').textContent = conversations.toLocaleString();
    
    // Update Pro
    const proExtra = Math.max(0, conversations - pricingTiers.pro.baseConversations);
    const proExtraCost = Math.ceil(proExtra / 100) * pricingTiers.pro.pricePer100;
    const proTotal = pricingTiers.pro.basePrice + proExtraCost;
    document.getElementById('proPrice').textContent = proTotal;
    document.getElementById('proConversations').textContent = (conversations * 2).toLocaleString();
    
    // Update Enterprise
    const enterpriseExtra = Math.max(0, conversations - pricingTiers.enterprise.baseConversations);
    const enterpriseExtraCost = Math.ceil(enterpriseExtra / 100) * pricingTiers.enterprise.pricePer100;
    const enterpriseTotal = pricingTiers.enterprise.basePrice + enterpriseExtraCost;
    document.getElementById('enterprisePrice').textContent = enterpriseTotal;
    document.getElementById('enterpriseConversations').textContent = (conversations * 4).toLocaleString();
}

conversationSlider.addEventListener('input', updatePricing);

// ============================================
// ANIMATED COUNTERS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-count, .stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats sections
document.querySelectorAll('.stats-grid, .hero-stats').forEach(section => {
    counterObserver.observe(section);
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================

const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');
const testimonialCards = document.querySelectorAll('.testimonial-card');

let currentTestimonial = 0;
let testimonialInterval;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToTestimonial(index));
    testimonialDots.appendChild(dot);
});

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialSlider();
    resetTestimonialInterval();
}

function updateTestimonialSlider() {
    testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    updateTestimonialSlider();
}

function resetTestimonialInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Start auto-slide
resetTestimonialInterval();

// ============================================
// MODAL
// ============================================

function openModal() {
    consultationModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    consultationModal.classList.remove('active');
    document.body.style.overflow = '';
}

bookConsultationBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

modalClose.addEventListener('click', closeModal);

consultationModal.querySelector('.modal-overlay').addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && consultationModal.classList.contains('active')) {
        closeModal();
    }
});

// Form submission
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    showToast('Consultation request submitted! We\'ll contact you soon.');
    closeModal();
    consultationForm.reset();
});

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.querySelector('i').className = type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-check-circle';
    toast.style.background = type === 'error' ? 'var(--error)' : 'var(--success)';
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll('.section-header, .demo-container, .selector-container, .workflow-container, .pricing-grid, .stats-grid, .clients-section, .testimonials-section, .cta-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.2 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any initial animations
    document.body.classList.add('loaded');
    
    // Console welcome message
    console.log('%c🚀 Welcome to SysZone Solution!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cAI Agent Development Services', 'font-size: 14px; color: #06b6d4;');
    console.log('%cVisit https://syszonesolution.com for more info', 'font-size: 12px; color: #888;');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Prefetch important pages
const prefetchLinks = [
    '#demo',
    '#pricing',
    '#contact'
];

prefetchLinks.forEach(link => {
    const prefetch = document.createElement('link');
    prefetch.rel = 'prefetch';
    prefetch.href = link;
    document.head.appendChild(prefetch);
});