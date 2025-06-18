class PortfolioProject extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return [
      "title",
      "description",
      "image",
      "technologies",
      "github",
      "demo",
      "status",
    ];
  }

  connectedCallback() {
    this.loadStyles().then(() => {
      this.render();
      this.addEventListeners();
    });
  }

  attributeChangedCallback() {
    if (this.shadowRoot && this.shadowRoot.querySelector(".project-card")) {
      this.render();
    }
  }

  async loadStyles() {
    this.loadFallbackStyles();
    // try {
    //     const response = await fetch('../css/projects.css');
    //     if (!response.ok) {
    //         throw new Error(`Failed to fetch CSS: ${response.status} ${response.statusText}`);
    //     }
    //     const css = await response.text();
    //     console.log(css);
    //     const style = document.createElement('style');
    //     style.textContent = css;

    //     if (this.shadowRoot) {
    //         this.shadowRoot.appendChild(style);
    //     } else {
    //         conssole.error('ShadowRoot is not initialized.');
    //     }
    // } catch (error) {
    //     console.warn('Could not load external CSS, using fallback styles:', error);
    //     this.loadFallbackStyles();
    // }
  }

  loadFallbackStyles() {
    const style = document.createElement("style");
    style.textContent = `
            :host {
                display: block;
            }
            
            .project-card {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                position: relative; 
                width: 80%; 
                margin-bottom: 2em;
            }
            
            .project-card:hover {
                transform: translateY(-10px) scale(1.02);
                box-shadow: 0 30px 60px #cd9020;
            }
            
            .image-container {
                position: relative;
                overflow: hidden;
            }
            
            .project-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }
            
            .project-card:hover .project-image {
                transform: scale(1.1);
            }
            
            .image-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), #f5cb5c);
                opacity: 0;
                transition: opacity 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 15px;
            }
            
            .project-card:hover .image-overlay {
                opacity: 1;
            }
            
            .overlay-btn {
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.9);
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
                text-decoration: none;
                color: #333;
                font-size: 14px;
            }
            
            .overlay-btn:hover {
                background: white;
                transform: scale(1.05);
            }
            
            .overlay-btn.github {
                background: rgba(0, 0, 0, 0.8);
                color: white;
            }
            
            .overlay-btn.github:hover {
                background: black;
            }
            
            .content {
                padding: 25px;
            }
            
            .project-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 15px;
            }
            
            .project-title {
                font-size: 1.4rem;
                font-weight: 700;
                color: #1f2937;
                margin: 0;
                line-height: 1.3;
            }
            
            .status-badge {
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .project-description {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 20px;
                font-size: 0.95rem;
            }
            
            .technologies {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .tech-tag {
                background: linear-gradient(135deg, #667eea, #cd9020);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 500;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .project-links {
                display: flex;
                gap: 12px;
            }
            
            .project-link {
                flex: 1;
                padding: 12px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                text-decoration: none;
                text-align: center;
                transition: all 0.3s ease;
                font-size: 0.9rem;
            }
            
            .github-link {
                background: #24292e;
                color: white;
            }
            
            .github-link:hover {
                background: #1a1e22;
                transform: translateY(-2px);
            }
            
            .demo-link {
                background: linear-gradient(135deg, #cd9020, #f5cb5c);
                color: white;
            }
            
            .demo-link:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            }
            
            .link-disabled {
                background: #e5e7eb;
                color: #9ca3af;
                cursor: not-allowed;
            }
            
            .floating-elements {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                overflow: hidden;
            }
            
            .floating-element {
                position: absolute;
                width: 6px;
                height: 6px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: float 6s ease-in-out infinite;
            }
            
            .floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
            .floating-element:nth-child(2) { top: 60%; right: 15%; animation-delay: 2s; }
            .floating-element:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 4s; }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
            }
            
            @media (max-width: 768px) {
                .content {
                    padding: 20px;
                }
                
                .project-title {
                    font-size: 1.2rem;
                }

                
                .project-header {
                    flex-direction: column;
                    gap: 10px;
                    align-items: flex-start;
                }
                .project-card {
                    margin-left: 1em
                }

            }
        `;
    this.shadowRoot.appendChild(style);
  }

  get title() {
    return this.getAttribute("title") || "Untitled Project";
  }
  get description() {
    return this.getAttribute("description") || "No description available.";
  }
  get image() {
    return (
      this.getAttribute("image") ||
      "https://via.placeholder.com/400x250?text=No+Image"
    );
  }
  get technologies() {
    return this.getAttribute("technologies") || "";
  }
  get github() {
    return this.getAttribute("github") || "";
  }
  get demo() {
    return this.getAttribute("demo") || "";
  }
  get status() {
    return this.getAttribute("status") || "completed";
  }

  getTechnologiesArray() {
    return this.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech);
  }

  getStatusColor() {
    switch (this.status.toLowerCase()) {
      case "completed":
        return "#10b981";
      case "in-progress":
        return "#f59e0b";
      case "planned":
        return "#6b7280";
      default:
        return "#10b981";
    }
  }

  getStatusText() {
    switch (this.status.toLowerCase()) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      default:
        return "Completed";
    }
  }

  render() {
    const technologies = this.getTechnologiesArray();
    const statusColor = this.getStatusColor();
    const statusText = this.getStatusText();

    // Update status badge color
    const existingCard = this.shadowRoot.querySelector(".project-card");
    if (existingCard) {
      existingCard.remove();
    }

    const cardElement = document.createElement("div");
    cardElement.className = "project-card";
    cardElement.innerHTML = `
            <div class="floating-elements">
                <div class="floating-element"></div>
                <div class="floating-element"></div>
                <div class="floating-element"></div>
            </div>
            
            <div class="image-container">
                <img src="${this.image}" alt="${
      this.title
    }" class="project-image" />
                <div class="image-overlay">
                    ${
                      this.github
                        ? `<a href="${this.github}" target="_blank" class="overlay-btn github">View Code</a>`
                        : ""
                    }
                    ${
                      this.demo
                        ? `<a href="${this.demo}" target="_blank" class="overlay-btn demo">Live Demo</a>`
                        : ""
                    }
                </div>
            </div>
            
            <div class="content">
                <div class="project-header">
                    <h3 class="project-title">${this.title}</h3>
                    <span class="status-badge" style="background: ${statusColor};">${statusText}</span>
                </div>
                
                <p class="project-description">${this.description}</p>
                
                ${
                  technologies.length > 0
                    ? `
                    <div class="technologies">
                        ${technologies
                          .map(
                            (tech) => `<span class="tech-tag">${tech}</span>`
                          )
                          .join("")}
                    </div>
                `
                    : ""
                }
                
                <div class="project-links">
                    ${
                      this.github
                        ? `<a href="${this.github}" target="_blank" class="project-link github-link">GitHub</a>`
                        : `<span class="project-link link-disabled">No Repository</span>`
                    }
                    ${
                      this.demo
                        ? `<a href="${this.demo}" target="_blank" class="project-link demo-link">Live Demo</a>`
                        : `<span class="project-link link-disabled">No Demo</span>`
                    }
                </div>
            </div>
        `;

    this.shadowRoot.appendChild(cardElement);
  }

  addEventListeners() {
    const card = this.shadowRoot.querySelector(".project-card");

    card.addEventListener("mouseenter", () => {
      this.dispatchEvent(
        new CustomEvent("project-hover", {
          detail: {
            title: this.title,
            status: this.status,
          },
          bubbles: true,
        })
      );
    });

    card.addEventListener("click", (e) => {
      if (e.target.tagName !== "A") {
        this.dispatchEvent(
          new CustomEvent("project-click", {
            detail: {
              title: this.title,
              description: this.description,
              technologies: this.getTechnologiesArray(),
            },
            bubbles: true,
          })
        );
      }
    });
  }
}

// Define the custom element
customElements.define("portfolio-project", PortfolioProject);

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioProject;
}
