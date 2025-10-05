import React from "react";
import "../css/Title.css";

// Example images (you can replace these with real URLs or imported assets)
const policies = [
  {
    title: "Shipping Policy",
    description:
      "We offer fast and reliable shipping worldwide. Orders are processed within 1-2 business days and delivered according to the shipping method selected at checkout. Tracking information will be provided via email.",
    image: "https://img.icons8.com/color/48/000000/delivery--v1.png",
  },
  {
    title: "Payment Policy",
    description:
      "We accept all major credit/debit cards, net banking, and UPI payments. All transactions are secured with SSL encryption to ensure your payment information is safe.",
    image: "https://img.icons8.com/color/48/000000/customer-support.png",
  },
  {
    title: "Privacy Policy",
    description:
      "Your privacy is important to us. We collect minimal personal information necessary to process orders and improve your shopping experience. Your data is never shared with third parties without consent.",
    image: "https://img.icons8.com/color/48/000000/privacy-policy.png",
  },
  {
    title: "Customer Support",
    description:
      "Our support team is available 24/7 via email, chat, or phone. We are committed to resolving your queries quickly and ensuring you have a seamless shopping experience.",
    image: "https://img.icons8.com/color/48/000000/customer-support.png",
  },
];

const OurPolicy = () => {
  return (
    <div className="policy-container">
      <h2 className="policy-title">Our Policies</h2>
      <p className="policy-intro">
        At <span className="brand">FOREVER</span>, we strive to provide the best shopping experience.
        Please review our policies below for clarity and trust.
      </p>

      <div className="policy-list">
        {policies.map((policy, index) => (
          <div key={index} className="policy-card">
            <img src={policy.image} alt={policy.title} className="policy-image" />
            <div className="policy-content">
              <h3 className="policy-card-title">{policy.title}</h3>
              <p className="policy-card-description">{policy.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
