// ─────────────────────────────────────────────────────────────────────────────
// data/clubData.ts
// Central data store for the RoboVITics Club Website.
// Replace placeholder values (description, imagePath, etc.) with real content.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    /** Absolute path from /public, e.g. "/projects/gesture-bot.jpg" */
    imagePath: string;
    readMoreLink: string;
    /** Domain badge label */
    domain: string;
    /** e.g. "COMPLETED" | "ONGOING" | "PROTOTYPE" */
    status: string;
}

export const projectsData: Project[] = [
    {
        id: 'PRJ_01',
        title: 'Secure Communication Between IoT Devices',
        tagline: 'End-to-end encrypted IoT mesh',
        description:
            'A secure communication framework for IoT endpoints. Uses lightweight TLS and mutual authentication to prevent MITM attacks in resource-constrained networks.',
        imagePath: '/project1.png',
        readMoreLink: '#',
        domain: 'CYBERSECURITY',
        status: 'COMPLETED',
    },
    {
        id: 'PRJ_02',
        title: 'Gesture Controlled Bot',
        tagline: 'Hand gestures → real-time motion',
        description:
            'A rover controlled by hand gestures via a wrist-mounted IMU and custom ML classifier, translating motion into directional commands with sub-100ms latency.',
        imagePath: '/project2.png',
        readMoreLink: '#',
        domain: 'ML & AI',
        status: 'COMPLETED',
    },
    {
        id: 'PRJ_03',
        title: 'DNS Tunneling Detection',
        tagline: 'Covert channel identification',
        description:
            'A network analysis tool that exposes covert data-exfiltration tunnels in live DNS traffic. Uses a trained random-forest classifier to achieve >96% accuracy.',
        imagePath: '/project3.png',
        readMoreLink: '#',
        domain: 'CYBERSECURITY',
        status: 'COMPLETED',
    },
    {
        id: 'PRJ_04',
        title: 'KeyDrive',
        tagline: 'PyBullet Rover Simulation',
        description:
            'A physics-accurate rover simulation built in PyBullet with a full URDF model. Features teleoperation and data logging for advanced control algorithm research.',
        imagePath: '/project4.png',
        readMoreLink: '#',
        domain: 'MECHANICAL',
        status: 'ONGOING',
    },
    {
        id: 'PRJ_05',
        title: 'Robotic Gripper',
        tagline: 'Adaptive under-actuated grasping',
        description:
            'A tendon-driven, under-actuated robotic gripper that passively conforms to object geometry. Uses force-feedback and PID control for versatile pick-and-place.',
        imagePath: '/project5.png',
        readMoreLink: '#',
        domain: 'MECHANICAL',
        status: 'COMPLETED',
    },
    {
        id: 'PRJ_06',
        title: 'FLF Bot',
        tagline: 'Fast Line Follower',
        description:
            'A high-speed line-following robot using an 8-sensor array, custom PCB, and PID control to hit 150 mm/s. Secured top-three placements in multiple competitions.',
        imagePath: '/project6.png',
        readMoreLink: '#',
        domain: 'ELECTRICAL',
        status: 'COMPLETED',
    },
];

// ─────────────────────────────────────────────────────────────────────────────

export interface Team {
    id: string;
    teamName: string;
    tagline: string;
    description: string;
    /** Absolute path from /public, e.g. "/teams/electrical-team.jpg" */
    teamPhotoPath: string;
    /** Absolute path from /public for the team logo */
    teamLogoPath?: string;
    /** Custom CSS transform for the team logo */
    teamLogoTransform?: string;
    /** Custom CSS transform for the team photo (e.g., to fix tilted images) */
    teamPhotoTransform?: string;
    /** Member count badge */
    memberCount: number;
    /** Primary accent colour (CSS rgba/hex string) */
    accentColor: string;
}

export const teamsData: Team[] = [
    {
        id: 'ORCUS',
        teamName: 'ORCUS',
        tagline: 'Combat Robotics Team',
        description: 'Team Orcus is the combat robotics wing of RoboVITics, specializing in designing and building powerful combat robots entirely from scratch. From concept to fabrication and competitive testing, the team combines precision engineering with strategic design to create battle-ready machines that excel in national competitions.',
        teamPhotoPath: '/Orcus 2.png',
        teamLogoPath: '/Orcus 1.png',
        teamLogoTransform: 'rotate(-5deg) scale(1.15)',
        memberCount: 20,
        accentColor: 'rgba(79,174,243,0.9)',
    },
    {
        id: 'ARTEMIS',
        teamName: 'ARTEMIS',
        tagline: 'Autonomous Robotics Team',
        description: 'Team Artemis develops autonomous legged robots capable of navigating complex environments with intelligence and precision. Bringing together Mechanical, Electrical, and Computer Science expertise, the team builds future-ready robotic systems powered by ROS, AI, perception, and advanced control technologies.',
        teamPhotoPath: '/Artemis 2.png',
        teamLogoPath: '/Artemis 1.png',
        memberCount: 25,
        accentColor: 'rgba(79,174,243,0.9)',
    },
    {
        id: 'AVATAR',
        teamName: 'AVATAR',
        tagline: 'Humanoid Robotics Team',
        description: 'Team Avatar is VIT\'s first official humanoid robotics team, dedicated to developing intelligent humanoid robots capable of interacting with real-world environments. By integrating advanced mechanics, sensing, and artificial intelligence, the team is shaping the future of humanoid robotics through research and innovation.',
        teamPhotoPath: '/Avatar 2.png',
        teamLogoPath: '/Avatar 1.png',
        memberCount: 15,
        accentColor: 'rgba(79,174,243,0.9)',
    },
];