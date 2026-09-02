/**
 * Preview Protection System
 * 
 * This module provides client-side protection for preview pages to prevent:
 * - Screenshots (via browser API detection and overlay)
 * - Text selection and copying
 * - Right-click context menu
 * - Keyboard shortcuts (PrintScreen, Ctrl+C, Ctrl+S, etc.)
 * - DevTools access attempts
 */

export interface PreviewProtectionConfig {
  enableWatermark?: boolean;
  watermarkText?: string;
  enableNoScreenshot?: boolean;
  enableNoSelect?: boolean;
  enableNoRightClick?: boolean;
  enableNoKeyboard?: boolean;
  enableNoDevTools?: boolean;
}

const DEFAULT_CONFIG: PreviewProtectionConfig = {
  enableWatermark: true,
  watermarkText: "PREVIEW - DO NOT DISTRIBUTE",
  enableNoScreenshot: true,
  enableNoSelect: true,
  enableNoRightClick: true,
  enableNoKeyboard: true,
  enableNoDevTools: true,
};

let isProtectionActive = false;
let protectionInterval: number | null = null;

/**
 * Initialize preview protection
 */
export function initPreviewProtection(config: Partial<PreviewProtectionConfig> = {}) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  if (isProtectionActive) {
    console.warn("Preview protection already active");
    return;
  }

  if (finalConfig.enableNoSelect) {
    disableTextSelection();
  }

  if (finalConfig.enableNoRightClick) {
    disableRightClick();
  }

  if (finalConfig.enableNoKeyboard) {
    disableKeyboardShortcuts();
  }

  if (finalConfig.enableNoScreenshot) {
    enableScreenshotProtection();
  }

  if (finalConfig.enableNoDevTools) {
    enableDevToolsProtection();
  }

  if (finalConfig.enableWatermark) {
    addWatermark(finalConfig.watermarkText || DEFAULT_CONFIG.watermarkText!);
  }

  isProtectionActive = true;
}

/**
 * Remove preview protection
 */
export function removePreviewProtection() {
  if (!isProtectionActive) {
    return;
  }

  // Remove event listeners
  document.removeEventListener('contextmenu', preventDefaultHandler);
  document.removeEventListener('keydown', keyboardHandler);
  document.removeEventListener('selectstart', preventDefaultHandler);
  document.removeEventListener('copy', preventDefaultHandler);
  document.removeEventListener('cut', preventDefaultHandler);
  
  // Remove watermark
  const watermark = document.getElementById('preview-watermark');
  if (watermark) {
    watermark.remove();
  }

  // Remove screenshot protection overlay
  const overlay = document.getElementById('screenshot-protection');
  if (overlay) {
    overlay.remove();
  }

  // Clear interval
  if (protectionInterval) {
    clearInterval(protectionInterval);
    protectionInterval = null;
  }

  // Re-enable selection
  document.body.style.userSelect = '';
  document.body.style.webkitUserSelect = '';

  isProtectionActive = false;
}

/**
 * Disable text selection
 */
function disableTextSelection() {
  document.body.style.userSelect = 'none';
  document.body.style.webkitUserSelect = 'none';
  (document.body.style as any).mozUserSelect = 'none';
  (document.body.style as any).msUserSelect = 'none';

  document.addEventListener('selectstart', preventDefaultHandler);
  document.addEventListener('copy', preventDefaultHandler);
  document.addEventListener('cut', preventDefaultHandler);
}

/**
 * Disable right-click context menu
 */
function disableRightClick() {
  document.addEventListener('contextmenu', preventDefaultHandler);
}

/**
 * Disable keyboard shortcuts
 */
function disableKeyboardShortcuts() {
  document.addEventListener('keydown', keyboardHandler);
}

/**
 * Keyboard event handler to block shortcuts
 */
function keyboardHandler(e: KeyboardEvent) {
  const blockedKeys = [
    'PrintScreen',
    'F12',
  ];

  const blockedCombinations = [
    { ctrl: true, key: 'c' }, // Copy
    { ctrl: true, key: 'x' }, // Cut
    { ctrl: true, key: 's' }, // Save
    { ctrl: true, key: 'p' }, // Print
    { ctrl: true, key: 'u' }, // View Source
    { ctrl: true, shift: true, key: 'I' }, // DevTools
    { ctrl: true, shift: true, key: 'C' }, // DevTools
    { ctrl: true, shift: true, key: 'J' }, // DevTools
    { meta: true, key: 'c' }, // Copy (Mac)
    { meta: true, key: 'x' }, // Cut (Mac)
    { meta: true, key: 's' }, // Save (Mac)
    { meta: true, key: 'p' }, // Print (Mac)
  ];

  // Check for single blocked keys
  if (blockedKeys.includes(e.key)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Check for blocked combinations
  for (const combo of blockedCombinations) {
    const ctrlMatch = combo.ctrl ? (e.ctrlKey || e.metaKey) : !e.ctrlKey && !e.metaKey;
    const shiftMatch = combo.shift ? e.shiftKey : !combo.shift;
    const keyMatch = combo.key.toLowerCase() === e.key.toLowerCase();

    if (ctrlMatch && shiftMatch && keyMatch) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}

/**
 * Prevent default event handler
 */
function preventDefaultHandler(e: Event) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

/**
 * Enable screenshot protection
 * Note: This is a best-effort approach. Screenshots can still be taken via
 * external tools or OS-level shortcuts.
 */
function enableScreenshotProtection() {
  // Create an overlay that changes when PrintScreen is detected
  const overlay = document.createElement('div');
  overlay.id = 'screenshot-protection';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999999;
    display: none;
  `;
  document.body.appendChild(overlay);

  // Detect PrintScreen key
  document.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      // Flash overlay to interfere with screenshot
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 100);
      
      // Clear clipboard if possible
      try {
        navigator.clipboard.writeText('');
      } catch (err) {
        // Clipboard API not available
      }
    }
  });
}

/**
 * Enable DevTools protection
 * Note: This is a deterrent, not a foolproof solution
 */
function enableDevToolsProtection() {
  let devToolsOpen = false;

  // Detect DevTools via dimension check
  const threshold = 160;
  
  protectionInterval = window.setInterval(() => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        // Could redirect or show warning here
        console.warn('DevTools detected');
      }
    } else {
      devToolsOpen = false;
    }
  }, 500);

  // Disable F12 and common DevTools shortcuts
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}

/**
 * Add watermark to the page
 */
function addWatermark(text: string) {
  const watermark = document.createElement('div');
  watermark.id = 'preview-watermark';
  watermark.innerHTML = text;
  watermark.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    font-size: 48px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 999998;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
  `;
  document.body.appendChild(watermark);
}

/**
 * React hook for preview protection
 */
export function usePreviewProtection(config: Partial<PreviewProtectionConfig> = {}) {
  if (typeof window !== 'undefined') {
    // Initialize on mount
    initPreviewProtection(config);

    // Cleanup on unmount
    return () => removePreviewProtection();
  }
  
  return () => {};
}
