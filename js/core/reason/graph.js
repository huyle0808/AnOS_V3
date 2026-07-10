import { knowledge } from "./knowledge.js";

// Lấy node trong Knowledge Graph
export function getNode(name) {

    if (!name) return null;

    return knowledge[name.toLowerCase()] || null;

}

// Lấy các liên kết của node
export function getLinks(name) {

    const node = getNode(name);

    if (!node) {
        return {};
    }

    return node.links || {};

}

// Kiểm tra node có tồn tại không
export function hasNode(name) {

    return getNode(name) !== null;

}

// Lấy danh sách tất cả node
export function getAllNodes() {

    return Object.keys(knowledge);

}
// Duyệt toàn bộ node liên quan (1 cấp)
export function expandGraph(nodes) {

    const result = new Set(nodes);

    for (const node of nodes) {

        const links = getLinks(node);

        for (const key in links) {

            const values = links[key];

            if (!Array.isArray(values)) continue;

            for (const value of values) {
                result.add(value);
            }

        }

    }

    return [...result];

}