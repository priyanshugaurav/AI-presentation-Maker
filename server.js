    const express = require('express');
    const app = express();
    const path = require('path'); 
    const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
    } = require("@google/generative-ai");
    
    const PORT = 3000;

  
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    

    app.use(express.static(path.join(__dirname, 'public')));
    

    app.get('/', (req, res) => {
        res.render('index');
    });
    

    app.post('/generate', async (req, res) => {
        try {
            console.log(req.body.prompt);
            const generatedPresentation= await generatePresentation(req.body.prompt);
            // const generatedPresentation= [
            //     {
            //       'Slide 1': {
            //         title: 'Title Slide**',
            //         content: "*   **Title:** Bresenham's Line Algorithm: A Pixel-Perfect Approach\n" +
            //           '*   **Subtitle:** Efficiently Drawing Lines in Computer Graphics\n' +
            //           '*   **Your Name/Affiliation**\n' +
            //           '*   **Date**'
            //       }
                  
            //     },
            //     {
            //       'Slide 2': {
            //         title: 'Introduction**',
            //         content: '*   **Line Drawing:** Fundamental operation in computer graphics, used in games, image editing, CAD, etc.\n' +
            //           '*   **Challenges:** Digital screens are pixelated, and straight lines often need to be approximated.\n' +
            //           "*   **Bresenham's Algorithm:** An efficient and elegant solution for drawing smooth lines on a grid."
            //       }
            //     },
            //     {
            //       'Slide 3': {
            //         title: 'Problem Statement**',
            //         content: '*   Given two endpoints (x1, y1) and (x2, y2), how to draw a line between them on a pixelated display?\n' +
            //           '*   Naïve approach: Calculate y for each x using the line equation, but this involves floating-point calculations, which are computationally expensive.\n' +
            //           "*   Bresenham's Algorithm: Uses only integer arithmetic, making it fast and efficient."
            //       }
            //     },
            //     {
            //       'Slide 4': {
            //         title: "Bresenham's Core Idea**",
            //         content: '*   **Incremental Approach:**  Move along the x-axis, choosing the best y-pixel at each step to stay closest to the actual line.\n' +
            //           '*   **Decision Parameter (p):** Calculates the difference between the ideal line position and the two possible pixel choices.\n' +
            //           '*   **Decision Logic:**\n' +
            //           '    *   If p > 0: Choose the higher pixel (y+1).\n' +
            //           '    *   If p <= 0: Choose the lower pixel (y).'
            //       }
            //     },
            //     {
            //       'Slide 5': {
            //         title: 'Algorithm Steps**',
            //         content: '1.  **Initialization:**\n' +
            //           '    *   Calculate Δx (x2 - x1) and Δy (y2 - y1).\n' +
            //           '    *   Set initial decision parameter p = 2Δy - Δx.\n' +
            //           '    *   Set starting point (x, y) = (x1, y1).\n' +
            //           '\n' +
            //           '2.  **Iteration (for x = x1 to x2):**\n' +
            //           '    *   Plot the pixel (x, y).\n' +
            //           '    *   If p > 0: \n' +
            //           '        *   Increment y (y = y + 1).\n' +
            //           '        *   Update p (p = p + 2Δy - 2Δx).\n' +
            //           '    *   Else:\n' +
            //           '        *   Update p (p = p + 2Δy).'
            //       }
            //     },
            //     {
            //       'Slide 6': {
            //         title: 'Illustration**',
            //         content: '*   **Diagram:** Show a line on a grid with the two pixel choices at each step and the decision parameter (p).\n' +        
            //           '*   **Explain:** How the decision parameter guides the choice of the best pixel to approximate the line.'
            //       }
            //     },
            //     {
            //       'Slide 7': {
            //         title: 'Advantages**',
            //         content: '*   **Integer Arithmetic:** Uses only integer calculations, making it fast and efficient.\n' +
            //           '*   **Simplicity:**  Easy to understand and implement.\n' +
            //           '*   **Widely Used:**  A cornerstone in computer graphics and many drawing libraries.'
            //       }
            //     },
            //     {
            //       'Slide 8': {
            //         title: 'Applications**',
            //         content: '*   **Raster Graphics:**  Line drawing in displays, printers, and other raster devices.\n' +
            //           '*   **Games:**  Rendering lines for objects, boundaries, and game environments.\n' +
            //           '*   **Image Processing:**  Edge detection, shape outlining, and image manipulation.'
            //       }
            //     },
            //     {
            //       'Slide 9': {
            //         title: 'Extensions**',
            //         content: '*   **Generalized Bresenham:**  Handles lines with any slope, including vertical and horizontal lines.\n' +
            //           "*   **Circle Drawing:**  Bresenham's principles can be adapted to efficiently draw circles.\n" +
            //           '*   **Anti-aliasing:**  Techniques can be combined with Bresenham to reduce jagged edges in lines.'
            //       }
            //     },
            //     {
            //       'Slide 10': {
            //         title: 'Conclusion**',
            //         content: "*   Bresenham's Line Algorithm is a powerful and efficient method for drawing lines on a pixelated grid.\n" +
            //           '*   Its use of integer arithmetic and incremental approach makes it ideal for computer graphics applications.\n' +
            //           '*   Its simplicity and effectiveness have made it a fundamental building block in various areas of computer graphics and image processing.\n' +
            //           '\n' +
            //           '**Additional Slides (Optional):**\n' +
            //           '\n' +
            //           '*'
            //       }
            //     },
            //     {
            //       'Slide 11': {
            //         title: "Code Example:**  Show a simple implementation of Bresenham's algorithm in a programming language like Python or C++.",       
            //         content: '*'
            //       }
            //     },
            //     {
            //       'Slide 12': {
            //         title: 'Comparison with Other Algorithms:**  Briefly discuss alternative line-drawing methods (e.g., DDA) and compare their advantages and disadvantages.',
            //         content: '**Please note:** \n' +
            //           '* This is a basic outline.  You may need to adapt and expand the content based on your specific audience and presentation goals. \n' +
            //           "*  Remember to include relevant visuals like diagrams, illustrations of lines drawn with Bresenham's algorithm, and code snippets to enhance your presentation."
            //       }
            //     }
            //   ]
            console.log(generatedPresentation)
            res.render('index1', { slides: generatedPresentation , theme: req.body.theme , prompt : req.body.prompt});
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error")
        }
    });
    
    // Function to generate presentation using Gemini AI
    async function generatePresentation(prompt) {
        const MODEL_NAME = "gemini-1.5-pro-latest";
        const API_KEY = "AIzaSyBWRIWfnFxUvexQsZEe_Aba5ZDFO__T74w"; 
    
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    
        const generationConfig = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
        };
    
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
    
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });
    
        const result = await chat.sendMessage("prepare a powerpoint presentation on topic "+prompt+` with the actual content in it so that i can just copy and paste it.....output type : ## Routing in Computer Networks: Navigating the Information Superhighway

        **Slide 1: Title Slide**
        
        *   **Title:** Routing: The Backbone of Network Communication
        *   **Subtitle:** Understanding how information travels across networks
        *   **Your Name/Affiliation**
        *   **Date**
        
        **Slide 2: Introduction to Routing**
        
        *   **What is Routing?** The process of selecting paths in a network along which to send data packets.
        *   **Importance of Routing:** 
            *   Enables communication between devices in different networks.
            *   Forms the foundation of the internet and all interconnected networks.
            *   Impacts network performance, reliability, and security.
        
        **Slide 3: Key Routing Concepts**
        
        *   **Routers:** Specialized network devices that forward data packets based on routing information.
        *   **Routing Table:** A data table stored in routers that lists the available paths to different destinations.
        *   **Routing Protocols:** Standardized sets of rules that govern how routers share information and select paths.
        *   **Metrics:** Parameters used by routing protocols to determine the best path, such as hop count, bandwidth, and delay.
        
        **Slide 4: Types of Routing Protocols**
        
        *   **Interior Gateway Protocols (IGPs):** Used within a single autonomous system (AS), e.g., within an organization's network.
            *   Examples: RIP, OSPF, EIGRP
        *   **Exterior Gateway Protocols (EGPs):** Used for routing between different AS, e.g., between different organizations or ISPs.
            *   Example: BGP (Border Gateway Protocol)
        
        **Slide 5: Routing Algorithms**
        
        *   **Distance Vector Routing:** Routers share routing information with neighbors, calculating the best path based on distance or hop count.
        *   **Link State Routing:** Routers build a complete picture of the network topology and calculate the best path based on various metrics.
        
        **Slide 6: Routing Challenges and Considerations**
        
        *   **Scalability:** Managing routing efficiently in large and complex networks.
        *   **Security:** Protecting routing information from attacks and ensuring reliable communication.
        *   **Quality of Service (QoS):** Prioritizing certain types of traffic for better performance.
        *   **Convergence Time:** The time it takes for routers to update their routing tables and reach a consistent state after a network change.
        
        **Slide 7: Conclusion**
        
        *   Routing is fundamental to network communication and the functioning of the internet.
        *   Understanding routing concepts and protocols is essential for network design, management, and troubleshooting.
        *   Efficient routing enables reliable, secure, and high-performance network connectivity.
        
        **Additional Slides (Optional):**
        
        *   **Slide 8: Routing in the Real World:** Examples of routing applications in different network environments (enterprise, data center, service provider).
        *   **Slide 9: Future of Routing:** Emerging trends and technologies in routing, such as software-defined networking (SDN) and intent-based networking (IBN).
        *   **Slide 10: Q&A** 
        
        **Please note:** This is a basic outline. You may need to adapt and expand the content based on your specific audience and presentation goals. Remember to include relevant visuals like diagrams, network maps, and screenshots to enhance your presentation.`);
        const response = result.response;
        console.log(response.text());
    
    
        const presentationString = response.text();
    
      
        const slidesContent = presentationString.split("**Slide");
    
    
        slidesContent.shift();
    
  
        const slides = [];
    
  
        slidesContent.forEach((slide, index) => {
        
            const slideNumber = index + 1;
    
        
            const titleStartIndex = slide.indexOf(":") + 1;
            const titleEndIndex = slide.indexOf("\n");
            const title = slide.slice(titleStartIndex, titleEndIndex).trim();
    
        
            const contentStartIndex = titleEndIndex + 1;
            const content = slide.slice(contentStartIndex).trim();
    
            // Creating slide object
            const slideObj = {};
            slideObj[`Slide ${slideNumber}`] = { title, content };
    
            // Adding slide object to slides array
            slides.push(slideObj);
        });

        console.log(slides[1]['Slide 2'].content);

        return slides;
    }
    

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });