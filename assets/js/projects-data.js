/* Project data. type: research | design | industry. domains drive the filters. */
window.PROJECTS = [
  {
    id: "deltavision",
    title: "Refuelling Module for Multi-Orbit Spacecraft",
    org: "deltaVision, Orbital Systems",
    period: "Apr 2026 – present",
    year: 2026,
    type: "industry",
    domains: ["Refuelling", "Structures & CAD", "Systems"],
    tools: ["CAD", "FEA"],
    image: "assets/img/deltavision-refuelling-module.webp",
    contain: true,
    logo: "assets/img/deltavision-logo.svg",
    gallery: ["assets/img/deltavision-drop-depot.webp", "assets/img/deltavision-infrastructure.webp"],
    link: "https://www.deltavision.space/orbital-refueling",
    linkLabel: "deltaVision orbital refuelling",
    summary: "Engineer in the Orbital Systems department, working on deltaVision's Refuelling Module, an ESA GSTP-funded refuelling node for multi-orbit spacecraft.",
    body: [
      "Since April 2026 I have worked full time in the Orbital Systems department of deltaVision in Munich. My role sits between mechanical design and systems engineering: everything from the physical layer upwards.",
      "deltaVision builds the hardware for propellant transfer in orbit: an open Utility Interface for docking, propellant transfer and data exchange, Refuelling Kits that make satellites refuellable, and the Refuelling Module, a host-agnostic node that stores propellant and transfers it to client satellites. The system covers storable conventional and green propellants, pressurants, and electric propulsion propellants such as xenon and krypton. An Orbital Drop Depot concept, launched on demand towards a servicer with configurable tanks, completes the Earth-orbit refuelling infrastructure.",
      "I work on the Refuelling Module, funded under ESA's General Support Technology Programme (GSTP). Day to day this means physical architecture, CAD design and structural analysis (FEA)."
    ]
  },
  {
    id: "encore",
    report: "Request the thesis",
    title: "ENCORE: ESA L-Class Mission to Enceladus (Master's Thesis)",
    org: "TUM Chair of Space Mobility and Propulsion",
    period: "Oct 2025 – Mar 2026",
    year: 2026,
    type: "research",
    domains: ["Mission & Trajectory", "Propulsion", "Systems"],
    tools: ["ASTOS", "GMAT", "MATLAB", "NASA CEA"],
    image: "assets/img/enceladus-plumes.webp",
    gallery: ["assets/img/encore-cad.webp"],
    link: "enceladus.html",
    linkLabel: "Explore the mission",
    summary: "Mission architecture, trajectory design and a hybrid water-electrolysis propulsion system for an orbiter and lander that refuel from Enceladus ice.",
    body: [
      "Master's thesis under Prof. Dr.-Ing. Chiara Manfletti: design and analysis of ENCORE (ENceladus Chemical Observation & Resource Extraction), a candidate ESA L-Class mission within Voyage 2050.",
      "I developed an Earth-Venus-Venus-Earth-Saturn trajectory with an energy-matching sequence, a Titan-assisted capture, a resonant Titan escape for sample return, and a hybrid chemical-electric architecture built on Water Electrolysis Propulsion. The architecture reaches a total delta-v of about 7.5 km/s at a propellant mass fraction of about 0.41.",
      "Cover: Cassini flying through the plumes of Enceladus, illustration by NASA/JPL-Caltech."
    ]
  },
  {
    id: "wep-hotfire",
    report: "Request the paper",
    title: "Hot-Fire Testing a Water Electrolysis Thruster",
    org: "TUM Chair of Space Mobility and Propulsion, experimental propulsion lab (with H. Sajid)",
    period: "Jan 2026",
    year: 2026,
    type: "research",
    domains: ["Propulsion", "Test", "Thermal"],
    tools: ["NASA CEA"],
    image: "assets/img/wep-hotfire-poster.webp",
    video: "assets/media/wep-hotfire.mp4",
    poster: "assets/img/wep-hotfire-poster.webp",
    summary: "Nine hot fires of a gaseous hydrogen-oxygen thruster: combustion efficiency up to 85%, and test data that showed where standard thermal models fall short for this chamber.",
    body: [
      "A hot-fire campaign on the third iteration of a water electrolysis propulsion (WEP) thruster, the propulsion type at the core of my ENCORE thesis. The uncooled Inconel 718 heat-sink chamber (1.7 mm throat) burned gaseous hydrogen and oxygen on the chair's mobile test bench.",
      "With no load cell available, we characterised combustion and heating instead of thrust. Across nine hot fires at mixture ratios of 5 to 12 and chamber pressures of 2.6 to 3.5 bar, characteristic-velocity efficiency peaked at 85% in fuel-rich operation; losses came from heat lost to the chamber walls and mixing in a replacement injector.",
      "Before testing, a lumped-capacitance model gave 4.5 s to the wall temperature limit, so the first burns were capped at 2 s. The measured heating was considerably faster, reaching the 1100 K limit in 2.75 s. The data showed that lumped capacitance and the Bartz correlation miss injector impingement and the high heat flux at the chamber entry, so we recommended transient finite-difference thermal models for the next iteration.",
      "The clip shows one burn with live chamber pressure and wall temperature; the shock diamonds in the exhaust are visible mid-burn."
    ]
  },
  {
    id: "rfa",
    title: "Systems Engineering Internship",
    org: "Rocket Factory Augsburg",
    period: "Jun – Aug 2025",
    year: 2025,
    type: "industry",
    domains: ["Systems", "Reliability & Safety"],
    tools: ["FMEA", "Requirements"],
    image: "assets/img/rfa-logo.webp",
    contain: true,
    gallery: ["assets/img/rfa.webp"],
    link: "rfa.html",
    linkLabel: "Internship details",
    summary: "Built a risk assessment tool for safety-critical launcher systems and reviewed 21 ground launch systems.",
    body: [
      "I developed a risk assessment tool for safety-critical systems and applied it to solenoid valves, high-pressure gas storage, thrust vector control and separation systems. I also supported requirement management, safety analysis (FMEA) and architecture development across the launcher.",
      "I reviewed 21 ground launch systems, from tower umbilicals and pad water deluge to fire protection, propellant handling and storage. I reviewed P&IDs, checked designs against requirements, and documented every system item, component and component type."
    ]
  },
  {
    id: "tvac",
    report: "Request the thesis",
    title: "Cold Plate and Thermal Shroud for a Dirty Thermal-Vacuum Chamber",
    org: "TUM Lunar and Planetary Exploration (semester thesis)",
    period: "Nov 2024 – Apr 2025",
    year: 2025,
    type: "research",
    domains: ["Thermal", "Structures & CAD", "Test"],
    tools: ["COMSOL", "SolidWorks"],
    image: "assets/img/tvac.webp",
    gallery: ["assets/img/tvac-final-assembly.webp", "assets/img/tvac-shroud-contours.webp", "assets/img/tvac-shroud-section.webp", "assets/img/tvac-brazed-plate.webp"],
    link: "tvac.html",
    linkLabel: "Project page",
    summary: "Designed and simulated a cold plate and modular thermal shroud for regolith experiments in vacuum.",
    body: [
      "Design and analysis of a cold plate and shroud for a thermal-vacuum chamber that replicates space-like thermal conditions for payloads tested with regolith simulant. The cold plate cools a bed of regolith simulant, while the shroud provides thermal isolation.",
      "I simulated heat transfer, temperature distribution and vacuum compatibility in COMSOL, and covered material selection and structural design for vacuum loads and thermal cycling."
    ]
  },
  {
    id: "rp2",
    report: true,
    title: "Upper-Stage Methalox Engine and Two-Stage Launcher",
    org: "TUM Rocket Propulsion II design challenge, engine systems team",
    period: "Summer 2025",
    year: 2025,
    type: "design",
    domains: ["Propulsion", "Systems", "Structures & CAD"],
    tools: ["NASA CEA", "Python", "CAD"],
    image: "assets/img/rp2-engine-cad.webp",
    gallery: ["assets/img/rp2-engine.webp", "assets/img/rp2-launcher.webp"],
    contain: true,
    summary: "Preliminary design of a 1 MN gas-generator methalox engine and the two-stage launcher around it, sized for 10 t to LEO.",
    body: [
      "Team project to design an upper-stage gas-generator engine burning liquid methane and oxygen: 1 MN of thrust at a nominal chamber pressure of 100 bar, for a two-stage expendable launcher that delivers 10 t to a 400 km orbit. Our team owned the engine system, coordinating the interfaces and budgets between the thrust chamber, turbopump, feed system and injector teams.",
      "We chose the mixture ratio and chamber pressure (swept from 80 to 150 bar) to minimise stage wet mass rather than maximise specific impulse, selected TEA/TEB hypergolic ignition from a weighted trade of five ignition systems to meet three in-flight restarts, and settled on a seven-engine first-stage cluster that fits the ±5° gimbal envelope in a 4 m core. An optional 7.6 t methalox kick stage extends the vehicle to 2.4 t direct to GEO."
    ]
  },
  {
    id: "soyuz",
    title: "Soyuz Simulator: Manual Rendezvous and Docking",
    org: "TUM Professorship of Human Spaceflight Technology, Seminar Spacecraft Manoeuvres",
    period: "Summer 2025",
    year: 2025,
    type: "research",
    domains: ["Mission & Trajectory", "Test"],
    tools: ["Soyuz simulator"],
    image: "assets/img/soyuz-simulator-tum.webp",
    summary: "Flew manual approaches and dockings to the ISS in TUM's Soyuz cockpit simulator, scored against real approach-corridor limits.",
    body: [
      "In this seminar with Prof. Gisela Detrell we trained in TUM's Soyuz simulator, a cockpit with the commander, flight engineer and scientist seats, two multi-function displays, a periscope and the translation and rotation hand controllers.",
      "We flew the final phases of a Soyuz approach to the ISS by hand: the fly-around, alignment with the approach corridor and docking at the port. Each flight was scored with penalty points for deviations in position, attitude, velocity and rotation rate, and for fuel use, time and the number of control inputs. Near the port, the limits tighten to about 0.1 m/s closing speed, within ±1.5° on every axis and under 0.15°/s rotation, so smooth, well-planned inputs matter more than speed."
    ]
  },
  {
    id: "cycler",
    report: true,
    title: "Project Nectar: Refuelling an Earth-Mars Cycler",
    org: "TUM Chair of Spacecraft Systems, Space Mission Design (Prof. Alessandro Golkar)",
    period: "Oct 2024 – Feb 2025",
    year: 2025,
    type: "design",
    domains: ["Refuelling", "Structures & CAD", "Thermal", "Systems", "Mission & Trajectory"],
    tools: ["Autodesk Inventor", "MagicDraw (SysML)", "Simscape", "MATLAB"],
    image: "assets/img/nectar-section.webp",
    contain: true,
    gallery: ["assets/img/nectar-frame-side.webp", "assets/img/nectar-frame-iso.webp", "assets/img/nectar-topology.webp", "assets/img/nectar-rear.webp", "assets/img/nectar-front.webp"],
    summary: "A reusable tanker that docks with an Aldrin Earth-Mars cycler. I did the CAD, physical architecture, structures and thermal; topology optimisation cut the frame's mass by 24%.",
    body: [
      "Six-person mission design study for refuelling an Aldrin Earth-Mars cycler: a spacecraft on a permanent Earth-Mars orbit that crews board instead of launching a full transfer vehicle every time. Nectar is the tanker that meets it at Earth flyby, docks, and transfers liquid methane and oxygen.",
      "I owned the physical side of the spacecraft: the full CAD model and physical architecture, the structure and thermal subsystems, and the concept of operations, along with the stakeholder analysis, requirements and MBSE model (MagicDraw, SysML).",
      "Architecture: a CFRP common-dome tank holding about 40.7 t of LOX and methane sits inside a CFRP six-bar frame, with trusses above and below carrying loads from the launcher adapter to the engine plate. A 5 mm aluminium 2219 shell with MLI surrounds it, and the International Docking System Standard port carries the refuelling interface. Four deployable solar arrays complete a vehicle of 5.1 t dry and 46.5 t wet, launched on Starship.",
      "Structures: FEA under Starship's 6 g axial and ±2 g lateral launch loads gave a minimum safety factor of 5. Topology optimisation of the frame then cut its mass from 278 kg to 211 kg, a 24% reduction.",
      "Thermal: cryogenic propellant at about 90–111 K shares the spacecraft with avionics that must stay between −20 and 60 °C. I decoupled them with Kapton and Vespel isolators, MLI and selected coatings, then built an eight-node Simscape model of both mission phases. It sized a 146 kg LOX boil-off allowance for the 48 hours before docking, and about 700 W and 750 W of heating for the arrays and avionics in the cycler's shadow.",
      "The team's trade-off favoured the cycler: about 472 t of total vehicle dry mass over seven crewed missions, against about 1,450 t for direct missions."
    ]
  },
  {
    id: "insight",
    report: true,
    title: "Thermal Analysis and Test of a Miniature InSight Lander",
    org: "TUM Lunar and Planetary Exploration, practical course (with A. Manai)",
    period: "Oct 2024 – Feb 2025",
    year: 2025,
    type: "research",
    domains: ["Thermal", "Test", "Data & Modelling"],
    tools: ["Thermal Desktop", "Julia"],
    image: "assets/img/insight-thermal.webp",
    summary: "Built a Thermal Desktop model of a miniature InSight lander, tested it in vacuum, and used a neural network to correlate the model.",
    body: [
      "Starting from example thermal models in Julia, we built a Thermal Desktop model of a miniature InSight lander and tested the hardware in a thermal-vacuum chamber through hot and cold cycles between -20 °C and 50 °C.",
      "The first model missed the measured temperatures by up to about 43 K in the cold case. Because a full transient run took around 7 hours, we generated a dataset of 123 steady-state runs sweeping 12 contact conductances, trained a neural network to infer better conductance values, and ran a sensitivity analysis to rank which contacts drive the error."
    ]
  },
  {
    id: "topology",
    report: true,
    title: "Topology Optimisation of a Falcon 9 Landing Leg",
    org: "TUM",
    period: "Oct 2024",
    year: 2024,
    type: "design",
    domains: ["Structures & CAD"],
    tools: ["Topology optimisation"],
    image: "assets/img/topology.webp",
    contain: true,
    summary: "Minimised landing-leg mass under touchdown and crosswind load cases while keeping stiffness.",
    body: [
      "Topology optimisation applied to a Falcon 9 landing leg to minimise mass while keeping sufficient stiffness. Two load cases were considered: a 22,200 N vertical load during a soft touchdown, and a shear force representing crosswinds or sliding on landing.",
      "The optimisation achieved a mass reduction of about 3,656 kg."
    ]
  },
  {
    id: "eventcam",
    report: true,
    title: "Event Camera Satellite for Space Situational Awareness",
    org: "TUM",
    period: "Apr – Aug 2024",
    year: 2024,
    type: "design",
    domains: ["Systems", "Mission & Trajectory"],
    tools: [],
    image: "assets/img/event-camera-sat.webp",
    summary: "A 100–500 kg LEO satellite that detects and tracks objects with an event camera and onboard AI.",
    body: [
      "Design of a single spacecraft for object detection and tracking in Low Earth Orbit using event camera technology and onboard AI, aimed at preventing satellite collisions.",
      "The 100–500 kg satellite carried a high-resolution event camera optimised for low power and real-time processing. Subsystems were designed against mission requirements, including orbit selection, thermal regulation, propulsion and TT&C."
    ]
  },
  {
    id: "psr",
    report: true,
    title: "Permanently Shadowed Regions Demonstrator",
    org: "TUM Lunar and Planetary Exploration",
    period: "May – Jul 2024",
    year: 2024,
    type: "design",
    domains: ["Hardware & Robotics"],
    tools: ["Raspberry Pi", "3D printing"],
    image: "assets/img/psr-poster.webp",
    video: "assets/media/psr-demonstrator.mp4",
    poster: "assets/img/psr-poster.webp",
    summary: "3D-printed lunar polar craters with a moving LED sun and a touchscreen data kiosk.",
    body: [
      "A demonstrator for the permanently shadowed regions on the Moon. 3D-printed craters from the lunar poles sit under an LED strip that simulates the Sun's movement and the shifting illumination.",
      "The LED circuit runs on a Raspberry Pi 4 with a light sensor that switches the LEDs off when nobody is watching. A touchscreen kiosk lets visitors explore lunar data from NASA's LRO and other missions. The craters are swappable and sit in a sealed display case."
    ]
  },
  {
    id: "biosphere",
    report: "Request the poster",
    title: "Mars on Earth Biosphere",
    org: "Competition, 1st place",
    period: "Nov – Dec 2023",
    year: 2023,
    type: "design",
    domains: ["Systems", "Test"],
    tools: [],
    image: "assets/img/mars-biosphere.webp",
    gallery: ["assets/img/mars-biosphere-2.webp"],
    summary: "First-place design of a test bed that simulates Martian soil, pressure, temperature and atmosphere.",
    body: [
      "Developed for a competition in which our team won first place: a controlled test-bed facility that simulates Martian environmental conditions. Three isolated compartments test different soils, atmosphere compositions and other factors.",
      "Pressure, temperature and atmospheric composition can be adjusted, and Martian soil is replicated with regolith simulants. Applications include growing edible plants under harsh conditions, testing genetically modified crops and assessing the energy needed to sustain life."
    ]
  },
  {
    id: "abet",
    title: "Air-Breathing Electrostatic Thruster",
    org: "Coventry University, two IAC 2024 papers",
    period: "Feb – Jun 2023",
    year: 2023,
    type: "research",
    domains: ["Propulsion", "Test"],
    tools: [],
    image: "assets/img/ab-thruster-parabolic.webp",
    gallery: ["assets/img/ab-thruster.webp"],
    link: "papers.html",
    linkLabel: "See the papers",
    summary: "Designed and tested multi-stage air-breathing electrostatic thrusters on the ground and in a parabolic flight.",
    body: [
      "Design and testing of air-breathing electrostatic thrusters for high-altitude applications, a propellant-free alternative to conventional ionic propulsion. Two multi-stage designs used copper wire grids as emitters and aluminium plates as collectors, which produced far less ozone than needle-based emitters.",
      "Tests covered emitter-collector spacing, orientation and stage count: parallel alignment and extra stages improved efficiency, with diminishing returns from airflow obstruction. Ground and parabolic-flight tests validated performance. The work produced two IAC 2024 papers."
    ]
  },
  {
    id: "rde",
    report: true,
    title: "Rotating Detonation Engines: Non-Circular Channels and Nozzles",
    org: "Coventry University",
    period: "Feb – Jun 2023",
    year: 2023,
    type: "research",
    domains: ["Propulsion", "Fluids & CFD"],
    tools: ["Converge CFD", "Ansys CFX"],
    image: "assets/img/rde.webp",
    summary: "CFD study of eight non-circular channel geometries; tri-arc channels gave the most stable detonation waves.",
    body: [
      "Building on research showing that tri-arc channels outperform other geometries, this project analysed flow in rotating detonation engines across eight non-circular channel geometries.",
      "Detonation was simulated in Converge CFD and flow behaviour analysed in Ansys CFX. Tri-arc channels gave the most stable rotating detonation waves."
    ]
  },
  {
    id: "mfdfa",
    report: "Request the paper",
    title: "Carbon Emission Price Forecasting",
    org: "Coventry University, with Prof. Stratis Kanarachos",
    period: "Mar 2022 – May 2023",
    year: 2023,
    type: "research",
    domains: ["Data & Modelling"],
    tools: ["MATLAB", "Python"],
    image: "assets/img/mfdfa.webp",
    contain: true,
    summary: "Combined a neural network with multifractal analysis of its error signal to forecast carbon prices.",
    body: [
      "Applied Multifractal Detrended Fluctuation Analysis (MFDFA) to carbon emission price forecasting. A 12-year dataset of 3,071 entries was analysed for variations in its fractal structure and fed into a neural network forecasting spot and futures prices.",
      "MFDFA was applied to the network's error signal to assess prediction accuracy. The average RMSE was 0.660 in training and 0.771 in prediction, and trimming the error signal reduced variance by 68.8%."
    ]
  },
  {
    id: "turbojet",
    title: "Turbojet Engine Modelling",
    org: "Coventry University",
    period: "Nov 2022 – Jan 2023",
    year: 2022,
    type: "design",
    domains: ["Propulsion", "Data & Modelling"],
    tools: ["Simulink", "MATLAB"],
    image: "assets/img/turbojet.webp",
    summary: "Component-level Simulink model of a turbojet across altitudes and turbine inlet temperatures.",
    body: [
      "A Simulink model of a turbojet in which the compressor, combustor, turbine and nozzle are each a subsystem. The study examined how altitude (5,000 to 10,000 m) and turbine inlet temperature affect thrust and fuel consumption."
    ]
  },
  {
    id: "climate",
    title: "Climate Chamber Flow Analysis",
    org: "Coventry University",
    period: "Nov 2022 – Jan 2023",
    year: 2022,
    type: "design",
    domains: ["Fluids & CFD", "Thermal"],
    tools: ["Ansys Fluent", "STAR-CCM+"],
    image: "assets/img/climate-chamber.webp",
    summary: "CFD of airflow and temperature distribution in a climate chamber to find hotspots.",
    body: [
      "Airflow and temperature distribution in a climate chamber, modelled in Ansys Fluent and STAR-CCM+ under extreme temperature, humidity and pressure conditions. The simulations identified airflow patterns, heat transfer efficiency and hotspots to improve the uniformity of test conditions."
    ]
  },
  {
    id: "escooter",
    title: "Racing E-Scooter",
    org: "Coventry University",
    period: "Mar – May 2022",
    year: 2022,
    type: "design",
    domains: ["Structures & CAD"],
    tools: ["Autodesk Inventor", "FMEA"],
    image: "assets/img/escooter.webp",
    contain: true,
    summary: "A 19-part racing e-scooter designed for manufacture and assembly, with a theoretical top speed of 100 km/h.",
    body: [
      "An e-scooter for professional racing, inspired by the ESkootr S1-X and designed in Inventor with hub motors, front air suspension and rear spring suspension. The design followed Design for Manufacture and Assembly principles and included an FMEA and a sustainability analysis. It needs only 19 manufactured parts."
    ]
  },
  {
    id: "minesweeper",
    title: "Minesweepers Competition Robot",
    org: "Coventry University Robotics Club, mechanical lead",
    period: "Jan – Mar 2022",
    year: 2022,
    type: "design",
    domains: ["Hardware & Robotics"],
    tools: [],
    image: "assets/img/minesweeper.webp",
    summary: "Led the mechanical team building a demining robot for the international Minesweepers competition.",
    body: [
      "The international Minesweepers competition challenges teams to build teleoperated or autonomous vehicles that detect and dispose of landmines and unexploded ordnance. As mechanical lead I oversaw the design, procurement and manufacture of the chassis, wheels, suspension, mine detector, gripper arm and collection basket.",
      "The robot was built and tested in under a month. At the competition in Alamein, Egypt, short circuits and transport damage limited its performance."
    ]
  },
  {
    id: "roboticarm",
    title: "3-Axis Robotic Arm for Friction Stir Welding",
    org: "Coventry University",
    period: "Feb – May 2021",
    year: 2021,
    type: "design",
    domains: ["Structures & CAD", "Hardware & Robotics"],
    tools: ["Autodesk Inventor"],
    image: "assets/img/robotic-arm.webp",
    summary: "Aluminium-extrusion gantry for friction stir welding and material processing.",
    body: [
      "A 3-axis robotic arm for aerospace manufacturing tasks such as friction stir welding and material removal. Designed from scratch in Inventor using aluminium extrusions, with rack-and-pinion drives on X and Y and a lead screw on Z. A full bill of materials and working drawings were produced."
    ]
  },
  {
    id: "imeche",
    title: "IMechE Repeatable Vehicle",
    org: "Institution of Mechanical Engineers challenge",
    period: "Feb – May 2021",
    year: 2021,
    type: "design",
    domains: ["Hardware & Robotics"],
    tools: [],
    image: "assets/img/imeche.webp",
    summary: "A purely mechanical vehicle that drives out, reverses and stops at its origin.",
    body: [
      "A fully mechanical vehicle with no control system that drives in a straight line, reverses and tries to stop exactly at its origin. A rack-and-pinion gearbox measures distance, the chassis is laser-cut acrylic, and a DPDT switch reverses the motor. The prototype completed two of three competition runs."
    ]
  },
  {
    id: "bascule",
    title: "Bascule Bridge",
    org: "Coventry University",
    period: "Feb – Apr 2020",
    year: 2020,
    type: "design",
    domains: ["Structures & CAD"],
    tools: ["Fusion 360"],
    image: "assets/img/bascule-bridge.webp",
    summary: "A movable bridge modelled in Fusion 360, inspired by the Arlington Memorial Bridge.",
    body: [
      "Design of a movable bridge for boats and barges. A bascule design was modelled in Fusion 360 with laser-cut wooden prototypes planned. Prototype manufacture stopped with the Covid-19 outbreak."
    ]
  },
  {
    id: "quadcopter",
    title: "Quadcopter",
    org: "Coventry University, first project",
    period: "Sep – Dec 2019",
    year: 2019,
    type: "design",
    domains: ["Hardware & Robotics"],
    tools: ["Fusion 360", "Python"],
    image: "assets/img/quadcopter.webp",
    summary: "My first hands-on build: a laser-cut quadcopter with Python control code.",
    body: [
      "My first hands-on project of the bachelor's programme. The chassis was designed in AutoCAD and Fusion 360, laser-cut and assembled, the circuit developed in TinkerCAD, and control code written in Python. The vehicle flew successfully in the final demonstration."
    ]
  }
];
