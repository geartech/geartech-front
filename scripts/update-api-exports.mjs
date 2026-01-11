#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Script para atualizar automaticamente as exportações de tipos e enums no index.tsx
 * baseado nas interfaces e enums encontrados no api.ts gerado pelo swagger-typescript-api
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_FILE = join(__dirname, '..', 'src', 'core', 'sdk', 'api.ts');
const INDEX_FILE = join(__dirname, '..', 'src', 'core', 'sdk', 'index.tsx');

function extractExportedInterfaces(content) {
    const interfaceRegex = /export interface (\w+)/g;
    const interfaces = [];
    let match;

    while ((match = interfaceRegex.exec(content)) !== null) {
        interfaces.push(match[1]);
    }

    return interfaces.sort();
}

function extractExportedEnums(content) {
    const enumRegex = /export enum (\w+)/g;
    const enums = [];
    let match;

    while ((match = enumRegex.exec(content)) !== null) {
        enums.push(match[1]);
    }

    return enums.sort();
}

function extractExportedTypes(content) {
    // Captura type aliases (ex: export type ProjectStatus = "PLANNED" | "IN_PROGRESS")
    const typeRegex = /export type (\w+)\s*=/g;
    const types = [];
    let match;

    while ((match = typeRegex.exec(content)) !== null) {
        types.push(match[1]);
    }

    return types.sort();
}

function categorizeInterfaces(interfaces) {
    return {
        // DTOs principais
        main: interfaces.filter(name =>
            name.endsWith('DTO') &&
            !name.includes('PageInfo') &&
            !name.includes('UserLogin')
        ),

        // DTOs especiais
        special: interfaces.filter(name =>
            name.includes('PageInfo') ||
            name.includes('UserLogin')
        ),

        // Requests
        requests: interfaces.filter(name => name.endsWith('Request')),

        // Records de AST
        ast: interfaces.filter(name => name.startsWith('Ast') && name.endsWith('Record')),

        // Records de arquitetura
        architecture: interfaces.filter(name =>
            name.endsWith('Record') &&
            !name.startsWith('Ast') &&
            !name.includes('Package') &&
            !name.includes('Main') &&
            !name.includes('Test')
        ),

        // Records de estrutura
        structure: interfaces.filter(name =>
            name.includes('PackageRecord') ||
            name.includes('MainJavaRecord') ||
            name.includes('MainResourcesRecord') ||
            name.includes('TestJavaRecord') ||
            name.includes('BasePackageRecord')
        ),

        // Outros
        other: interfaces.filter(name =>
            !name.endsWith('DTO') &&
            !name.endsWith('Request') &&
            !name.endsWith('Record')
        )
    };
}

function categorizeEnums(enums) {
    return {
        // Enums de status
        status: enums.filter(name =>
            name.toLowerCase().includes('status') ||
            name.toLowerCase().includes('state')
        ),

        // Enums de tipo
        type: enums.filter(name =>
            name.toLowerCase().includes('type') ||
            name.toLowerCase().includes('kind')
        ),

        // Outros enums
        other: enums.filter(name =>
            !name.toLowerCase().includes('status') &&
            !name.toLowerCase().includes('state') &&
            !name.toLowerCase().includes('type') &&
            !name.toLowerCase().includes('kind')
        )
    };
}

function generateExportSection(interfaces, enums, types) {
    const interfaceCategories = categorizeInterfaces(interfaces);
    const enumCategories = categorizeEnums(enums);

    let exportSection = '';

    // ===== ENUMS =====
    if (enums.length > 0) {
        exportSection += '// ===== Exportação dos Enums =====\n';
        exportSection += '// Re-exporte os enums gerados pelo swagger-typescript-api\n';
        exportSection += 'export {\n';

        if (enumCategories.status.length > 0) {
            exportSection += '  // Enums de status\n';
            enumCategories.status.forEach(name => {
                exportSection += `  ${name},\n`;
            });
        }

        if (enumCategories.type.length > 0) {
            exportSection += '  // Enums de tipo\n';
            enumCategories.type.forEach(name => {
                exportSection += `  ${name},\n`;
            });
        }

        if (enumCategories.other.length > 0) {
            exportSection += '  // Outros enums\n';
            enumCategories.other.forEach(name => {
                exportSection += `  ${name},\n`;
            });
        }

        exportSection += '} from \'./api\';\n\n';
    }

    // ===== TYPES (union types) =====
    if (types.length > 0) {
        // Filtra types que não são interfaces ou enums já exportados
        const uniqueTypes = types.filter(t =>
            !interfaces.includes(t) &&
            !enums.includes(t)
        );

        if (uniqueTypes.length > 0) {
            exportSection += '// ===== Exportação dos Types =====\n';
            exportSection += '// Re-exporte os type aliases gerados pelo swagger-typescript-api\n';
            exportSection += 'export type {\n';
            uniqueTypes.forEach(name => {
                exportSection += `  ${name},\n`;
            });
            exportSection += '} from \'./api\';\n\n';
        }
    }

    // ===== INTERFACES/DTOs =====
    exportSection += '// ===== Exportação dos DTOs =====\n';
    exportSection += '// Re-exporte os tipos DTO gerados pelo swagger-typescript-api\n';
    exportSection += 'export type {\n';

    if (interfaceCategories.main.length > 0) {
        exportSection += '  // DTOs principais\n';
        interfaceCategories.main.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.special.length > 0) {
        exportSection += '  // DTOs especiais\n';
        interfaceCategories.special.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.requests.length > 0) {
        exportSection += '  // Requests\n';
        interfaceCategories.requests.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.ast.length > 0) {
        exportSection += '  // Records de AST\n';
        interfaceCategories.ast.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.architecture.length > 0) {
        exportSection += '  // Records de arquitetura\n';
        interfaceCategories.architecture.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.structure.length > 0) {
        exportSection += '  // Records de estrutura\n';
        interfaceCategories.structure.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    if (interfaceCategories.other.length > 0) {
        exportSection += '  // Outros tipos\n';
        interfaceCategories.other.forEach(name => {
            exportSection += `  ${name},\n`;
        });
    }

    exportSection += '} from \'./api\';\n';

    return exportSection;
}

function updateIndexFile(interfaces, enums, types) {
    let indexContent = readFileSync(INDEX_FILE, 'utf-8');

    // Remove seções de exportação existentes
    const enumSectionRegex = /\/\/ ===== Exportação dos Enums =====[\s\S]*?} from '\.\/api';\n\n?/;
    const typeSectionRegex = /\/\/ ===== Exportação dos Types =====[\s\S]*?} from '\.\/api';\n\n?/;
    const dtoSectionRegex = /\/\/ ===== Exportação dos DTOs =====[\s\S]*?} from '\.\/api';\n/;

    indexContent = indexContent.replace(enumSectionRegex, '');
    indexContent = indexContent.replace(typeSectionRegex, '');
    indexContent = indexContent.replace(dtoSectionRegex, '');

    // Remove linhas em branco extras no final
    indexContent = indexContent.trimEnd();

    // Adiciona a nova seção de exportação
    const exportSection = generateExportSection(interfaces, enums, types);
    indexContent += '\n\n' + exportSection;

    writeFileSync(INDEX_FILE, indexContent, 'utf-8');

}

function main() {
    try {
        if (!existsSync(API_FILE)) {
            process.exit(1);
        }

        const apiContent = readFileSync(API_FILE, 'utf-8');

        const interfaces = extractExportedInterfaces(apiContent);
        const enums = extractExportedEnums(apiContent);
        const types = extractExportedTypes(apiContent);

        if (interfaces.length === 0 && enums.length === 0 && types.length === 0) {
            return;
        }

        updateIndexFile(interfaces, enums, types);

    } catch (error) {
        process.exit(error.message || 1);
    }
}

main();
