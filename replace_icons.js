import fs from 'fs';
import path from 'path';

// Mapping of Lucide icon names to FontAwesome solid and brand icon names.
const iconMap = {
    // Navigation & UI
    ArrowRight: 'faArrowRight',
    ArrowLeft: 'faArrowLeft',
    ChevronDown: 'faChevronDown',
    ChevronUp: 'faChevronUp',
    ChevronRight: 'faChevronRight',
    ChevronLeft: 'faChevronLeft',
    Menu: 'faBars',
    X: 'faXmark',
    Search: 'faSearch',
    MoreHorizontal: 'faEllipsis',
    Check: 'faCheck',
    CheckCircle: 'faCircleCheck',
    Circle: 'faCircle',
    Dot: 'faCircle', // Approximate for Dot
    GripVertical: 'faGripVertical',
    PanelLeft: 'faTableColumns',

    // Contacts & Social
    Mail: 'faEnvelope',
    Phone: 'faPhone',
    MessageCircle: 'faCommentDots',
    Send: 'faPaperPlane',
    Linkedin: 'faLinkedin', // Brand icon

    // Services & Differentiators
    Smartphone: 'faMobileScreen',
    Monitor: 'faLaptop',
    Code: 'faCode',
    Zap: 'faBolt',
    Shield: 'faShieldHalved',
    Layers: 'faLayerGroup',
    Globe: 'faGlobe',
    Users: 'faUsers',
    Target: 'faBullseye',
    Heart: 'faHeart',
    Quote: 'faQuoteLeft',
};

// Which ones are brand icons?
const brandIcons = new Set(['Linkedin']);

const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Find lucid react import
    const lucideImportRegex = /import\s+\{([^}]+)\}\s+from\s+["']lucide-react["'];?/g;
    let match;
    let modificationsMade = false;

    while ((match = lucideImportRegex.exec(content)) !== null) {
        modificationsMade = true;
        const importedIcons = match[1].split(',').map(s => s.trim()).filter(Boolean);

        let solidImports = [];
        let brandImports = [];

        importedIcons.forEach(icon => {
            let faIcon = iconMap[icon];
            if (!faIcon) {
                console.warn(`WARNING: No FontAwesome mapping found for Lucide icon '${icon}' in ${filePath}`);
                faIcon = `fa${icon}`; // rough fallback
            }

            if (brandIcons.has(icon)) {
                brandImports.push(faIcon);
            } else {
                solidImports.push(faIcon);
            }

            // Replace JSX usages: <IconName /> or <IconName className="..." />
            // Look for `<IconName` and replace with `<FontAwesomeIcon icon={faIcon}`
            const jsxRegex = new RegExp(`<${icon}([^>]*)>`, 'g');
            content = content.replace(jsxRegex, `<FontAwesomeIcon icon={${faIcon}}$1>`);
        });

        // Create new imports
        let newImports = `import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';\n`;
        if (solidImports.length > 0) {
            newImports += `import { ${solidImports.join(', ')} } from '@fortawesome/free-solid-svg-icons';\n`;
        }
        if (brandImports.length > 0) {
            newImports += `import { ${brandImports.join(', ')} } from '@fortawesome/free-brands-svg-icons';\n`;
        }

        content = content.replace(match[0], newImports);
    }

    if (modificationsMade) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
};

const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const dirFile = path.join(dir, file);
        const dirent = fs.statSync(dirFile);
        if (dirent.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                filelist = walkSync(dirFile, filelist);
            }
        } else {
            if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
                filelist.push(dirFile);
            }
        }
    }
    return filelist;
};

const srcDir = path.join(process.cwd(), 'src');
console.log('Scanning for lucide-react usages...');
const files = walkSync(srcDir);
files.forEach(filepath => {
    processFile(filepath);
});
console.log('Migration complete.');
