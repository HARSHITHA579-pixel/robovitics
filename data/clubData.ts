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
            'A framework for establishing cryptographically secure communication channels between heterogeneous IoT endpoints. Implements lightweight TLS variants and mutual authentication to defend against man-in-the-middle attacks in resource-constrained environments.',
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
            'A rover platform controlled entirely through hand gestures captured via a wrist-mounted IMU and processed by a custom ML classifier. Translates six-axis motion data into directional commands with sub-100 ms latency over a wireless link.',
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
            'A network-analysis tool that applies statistical entropy and frequency-domain features to live DNS traffic, exposing covert data-exfiltration tunnels with a trained random-forest classifier. Achieves >96% detection accuracy on benchmark datasets.',
        imagePath: '/project 3.png',
        readMoreLink: '#',
        domain: 'CYBERSECURITY',
        status: 'COMPLETED',
    },
    {
        id: 'PRJ_04',
        title: 'KeyDrive',
        tagline: 'PyBullet Rover Simulation',
        description:
            'A physics-accurate rover simulation built in PyBullet with a full URDF model including suspension, motor dynamics, and terrain interaction. Features keyboard-driven teleoperation and a data-logging pipeline for control algorithm research.',
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
            'A 3D-printed, servo-actuated gripper employing a tendon-driven under-actuated design that passively conforms to object geometry. Paired with force-feedback sensors and a PID controller for reliable pick-and-place across varied payloads.',
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
            'A high-speed line-follower using an 8-sensor array, PID closed-loop control, and a custom PCB running at 150 mm/s on 30 mm track widths. Competed at multiple inter-college robotics competitions, placing in the top three.',
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
        teamPhotoPath: '/orcus2.png',
        teamLogoPath: '/orcus1.png',
        memberCount: 20,
        accentColor: 'rgba(79,174,243,0.9)',
    },
    {
        id: 'ARTEMIS',
        teamName: 'ARTEMIS',
        tagline: 'Autonomous Robotics Team',
        description: 'Team Artemis develops autonomous legged robots capable of navigating complex environments with intelligence and precision. Bringing together Mechanical, Electrical, and Computer Science expertise, the team builds future-ready robotic systems powered by ROS, AI, perception, and advanced control technologies.',
        teamPhotoPath: '/artemis2.png',
        teamLogoPath: '/artemis1.png',
        memberCount: 25,
        accentColor: 'rgba(79,174,243,0.9)',
    },
    {
        id: 'AVATAR',
        teamName: 'AVATAR',
        tagline: 'Humanoid Robotics Team',
        description: 'Team Avatar is VIT\'s first official humanoid robotics team, dedicated to developing intelligent humanoid robots capable of interacting with real-world environments. By integrating advanced mechanics, sensing, and artificial intelligence, the team is shaping the future of humanoid robotics through research and innovation.',
        teamPhotoPath: '/avatar2.png',
        teamLogoPath: '/avatar1.png',
        memberCount: 15,
        accentColor: 'rgba(79,174,243,0.9)',
    },
];
