import { Lock, Clock, Globe } from 'lucide-react';

export const formatBytes = (bytes: number): string => {
    if(!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes)/Math.log(k));
    return ( bytes/ Math.pow(k, i)).toFixed(1) + " " + sizes[i];
}

export const formatTime = (second: number): string =>
    second < 60 ? `${second}s` : `${Math.floor(second / 60)}m ${second % 60}s`;


export const randomId = (): string => 
    Math.random().toString(36).slice(2, 8).toUpperCase();

export const FEATURE_PILLS = [
    { icon: Lock, color: "#6366f1", label: "End-to-end encrypted", sub: "256-bit AES"},
    { icon: Clock, color: "#3b82f6", label: "Links expire in 24h", sub: "Auto-delete after"},
    { icon: Globe, color: "#10b981", label: "Global CDN", sub:"Fast everywhere"}
];


export const FOOTER_LINKS = ["Privacy", "Terms", "API", "Status"]