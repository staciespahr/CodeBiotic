export type WCAGPriority = 'High' | 'Medium' | 'Low'
export type WCAGLevel = 'A' | 'AA'

export interface WCAGCriterion {
  id: string
  name: string
  level: WCAGLevel
  slug: string
  priority: WCAGPriority
}

export const wcagCriteria: WCAGCriterion[] = [
  // LEVEL A
  { id: '1.1.1', name: 'Non-text Content', level: 'A', slug: 'non-text-content', priority: 'High' },
  { id: '1.2.1', name: 'Audio-only and Video-only (Prerecorded)', level: 'A', slug: 'audio-only-and-video-only-prerecorded', priority: 'Low' },
  { id: '1.2.2', name: 'Captions (Prerecorded)', level: 'A', slug: 'captions-prerecorded', priority: 'Low' },
  { id: '1.2.3', name: 'Audio Description or Media Alternative (Prerecorded)', level: 'A', slug: 'audio-description-or-media-alternative-prerecorded', priority: 'Low' },
  { id: '1.3.1', name: 'Info and Relationships', level: 'A', slug: 'info-and-relationships', priority: 'High' },
  { id: '1.3.2', name: 'Meaningful Sequence', level: 'A', slug: 'meaningful-sequence', priority: 'Medium' },
  { id: '1.3.3', name: 'Sensory Characteristics', level: 'A', slug: 'sensory-characteristics', priority: 'High' },
  { id: '1.4.1', name: 'Use of Color', level: 'A', slug: 'use-of-color', priority: 'High' },
  { id: '1.4.2', name: 'Audio Control', level: 'A', slug: 'audio-control', priority: 'Low' },
  { id: '2.1.1', name: 'Keyboard', level: 'A', slug: 'keyboard', priority: 'High' },
  { id: '2.1.2', name: 'No Keyboard Trap', level: 'A', slug: 'no-keyboard-trap', priority: 'High' },
  { id: '2.1.4', name: 'Character Key Shortcuts', level: 'A', slug: 'character-key-shortcuts', priority: 'Low' },
  { id: '2.2.1', name: 'Timing Adjustable', level: 'A', slug: 'timing-adjustable', priority: 'Low' },
  { id: '2.2.2', name: 'Pause, Stop, Hide', level: 'A', slug: 'pause-stop-hide', priority: 'Low' },
  { id: '2.3.1', name: 'Three Flashes or Below Threshold', level: 'A', slug: 'three-flashes-or-below-threshold', priority: 'Low' },
  { id: '2.4.1', name: 'Bypass Blocks', level: 'A', slug: 'bypass-blocks', priority: 'Medium' },
  { id: '2.4.2', name: 'Page Titled', level: 'A', slug: 'page-titled', priority: 'High' },
  { id: '2.4.3', name: 'Focus Order', level: 'A', slug: 'focus-order', priority: 'High' },
  { id: '2.4.4', name: 'Link Purpose (In Context)', level: 'A', slug: 'link-purpose-in-context', priority: 'High' },
  { id: '2.5.1', name: 'Pointer Gestures', level: 'A', slug: 'pointer-gestures', priority: 'Low' },
  { id: '2.5.2', name: 'Pointer Cancellation', level: 'A', slug: 'pointer-cancellation', priority: 'Medium' },
  { id: '2.5.3', name: 'Label in Name', level: 'A', slug: 'label-in-name', priority: 'High' },
  { id: '2.5.4', name: 'Motion Actuation', level: 'A', slug: 'motion-actuation', priority: 'Low' },
  { id: '3.1.1', name: 'Language of Page', level: 'A', slug: 'language-of-page', priority: 'High' },
  { id: '3.2.1', name: 'On Focus', level: 'A', slug: 'on-focus', priority: 'High' },
  { id: '3.2.2', name: 'On Input', level: 'A', slug: 'on-input', priority: 'High' },
  { id: '3.2.6', name: 'Consistent Help', level: 'A', slug: 'consistent-help', priority: 'High' },
  { id: '3.3.1', name: 'Error Identification', level: 'A', slug: 'error-identification', priority: 'High' },
  { id: '3.3.2', name: 'Labels or Instructions', level: 'A', slug: 'labels-or-instructions', priority: 'High' },
  { id: '3.3.7', name: 'Redundant Entry', level: 'A', slug: 'redundant-entry', priority: 'Medium' },
  { id: '4.1.2', name: 'Name, Role, Value', level: 'A', slug: 'name-role-value', priority: 'High' },

  // LEVEL AA
  { id: '1.2.4', name: 'Captions (Live)', level: 'AA', slug: 'captions-live', priority: 'Low' },
  { id: '1.2.5', name: 'Audio Description (Prerecorded)', level: 'AA', slug: 'audio-description-prerecorded', priority: 'Low' },
  { id: '1.3.4', name: 'Orientation', level: 'AA', slug: 'orientation', priority: 'Medium' },
  { id: '1.3.5', name: 'Identify Input Purpose', level: 'AA', slug: 'identify-input-purpose', priority: 'High' },
  { id: '1.4.3', name: 'Contrast (Minimum)', level: 'AA', slug: 'contrast-minimum', priority: 'High' },
  { id: '1.4.4', name: 'Resize Text', level: 'AA', slug: 'resize-text', priority: 'Medium' },
  { id: '1.4.5', name: 'Images of Text', level: 'AA', slug: 'images-of-text', priority: 'High' },
  { id: '1.4.10', name: 'Reflow', level: 'AA', slug: 'reflow', priority: 'Medium' },
  { id: '1.4.11', name: 'Non-text Contrast', level: 'AA', slug: 'non-text-contrast', priority: 'High' },
  { id: '1.4.12', name: 'Text Spacing', level: 'AA', slug: 'text-spacing', priority: 'Medium' },
  { id: '1.4.13', name: 'Content on Hover or Focus', level: 'AA', slug: 'content-on-hover-or-focus', priority: 'High' },
  { id: '2.4.5', name: 'Multiple Ways', level: 'AA', slug: 'multiple-ways', priority: 'Medium' },
  { id: '2.4.6', name: 'Headings and Labels', level: 'AA', slug: 'headings-and-labels', priority: 'High' },
  { id: '2.4.7', name: 'Focus Visible', level: 'AA', slug: 'focus-visible', priority: 'High' },
  { id: '2.4.11', name: 'Focus Not Obscured (Minimum)', level: 'AA', slug: 'focus-not-obscured-minimum', priority: 'Medium' },
  { id: '2.5.7', name: 'Dragging Movements', level: 'AA', slug: 'dragging-movements', priority: 'Medium' },
  { id: '2.5.8', name: 'Target Size (Minimum)', level: 'AA', slug: 'target-size-minimum', priority: 'High' },
  { id: '3.1.2', name: 'Language of Parts', level: 'AA', slug: 'language-of-parts', priority: 'High' },
  { id: '3.2.3', name: 'Consistent Navigation', level: 'AA', slug: 'consistent-navigation', priority: 'High' },
  { id: '3.2.4', name: 'Consistent Identification', level: 'AA', slug: 'consistent-identification', priority: 'High' },
  { id: '3.3.3', name: 'Error Suggestion', level: 'AA', slug: 'error-suggestion', priority: 'High' },
  { id: '3.3.4', name: 'Error Prevention (Legal, Financial, Data)', level: 'AA', slug: 'error-prevention-legal-financial-data', priority: 'High' },
  { id: '3.3.8', name: 'Accessible Authentication (Minimum)', level: 'AA', slug: 'accessible-authentication-minimum', priority: 'Low' },
  { id: '4.1.3', name: 'Status Messages', level: 'AA', slug: 'status-messages', priority: 'High' }
]
