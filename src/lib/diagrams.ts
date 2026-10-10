/**
 * Workflow data for each product's live diagram, shared by ProductDiagram (the window) and ProductBento
 * (the small tile's status line) so the two can never disagree.
 * PLACEHOLDER: steps and wording are illustrative until the product team confirms the real workflows.
 */
import type { State } from './state';

export type Diagram = 'deal-pipeline' | 'valuation-tracker' | 'agent-workflow';
export type Frame = [State, string][]; // one [state, note] per step

export interface DiagramData {
	title: string;
	steps: string[];
	frames: Frame[];
	/** Frame shown without JavaScript and for reduced motion: the most telling moment. */
	still: number;
}

/** Builds frames for a simple left-to-right pipeline: done steps settle, the current one is active. */
function pipeline(notes: { idle: string; active: string; success: string }[]): Frame[] {
	const frames: Frame[] = [];
	for (let k = 0; k <= notes.length; k++) {
		frames.push(
			notes.map((n, i) =>
				i < k ? ['success', n.success] : i === k ? ['active', n.active] : ['idle', n.idle],
			),
		);
	}
	return frames;
}

export const diagrams: Record<Diagram, DiagramData> = {
	'deal-pipeline': {
		title: 'Working capital renewal',
		steps: ['Lead captured', 'Pricing approved', 'Credit review', 'Sanction'],
		frames: pipeline([
			{ idle: 'Not started', active: 'Capturing details', success: 'From RM visit' },
			{ idle: 'Not started', active: 'Checking authority', success: 'Within authority' },
			{ idle: 'Not started', active: 'Awaiting financials', success: 'Approved' },
			{ idle: 'Not started', active: 'Preparing letter', success: 'Sanctioned' },
		]),
		still: 2,
	},
	'valuation-tracker': {
		title: 'Collateral: commercial property',
		steps: ['Valuation', 'Insurance', 'Legal report', 'Charge registration'],
		frames: [
			[
				['success', 'Current'],
				['success', 'Current'],
				['success', 'Current'],
				['error', 'Missing'],
			],
			[
				['success', 'Current'],
				['warning', 'Expires in 12 days'],
				['success', 'Current'],
				['error', 'Missing'],
			],
			[
				['success', 'Current'],
				['active', 'Renewal requested'],
				['success', 'Current'],
				['active', 'Filing with ROC'],
			],
			[
				['success', 'Current'],
				['success', 'Renewed'],
				['success', 'Current'],
				['active', 'Filing with ROC'],
			],
			[
				['success', 'Current'],
				['success', 'Renewed'],
				['success', 'Current'],
				['success', 'Registered'],
			],
		],
		still: 1,
	},
	'agent-workflow': {
		title: 'Pricing exception request',
		steps: ['Request received', 'Reading documents', 'Control check', 'Approval'],
		frames: [
			[
				['success', 'Email with attachment'],
				['flowing', 'AI extracting terms'],
				['idle', 'Queued'],
				['idle', 'Queued'],
			],
			[
				['success', 'Email with attachment'],
				['success', 'Terms extracted'],
				['active', 'Checking limits'],
				['idle', 'Queued'],
			],
			[
				['success', 'Email with attachment'],
				['success', 'Terms extracted'],
				['warning', 'Above RM limit'],
				['active', 'Routed to credit head'],
			],
			[
				['success', 'Email with attachment'],
				['success', 'Terms extracted'],
				['success', 'Exception logged'],
				['success', 'Approved'],
			],
		],
		still: 0,
	},
};

export interface Focus {
	state: State;
	label: string;
	note: string;
}

const urgency: State[] = ['error', 'warning', 'flowing', 'active'];

/**
 * The step a reader should notice in a frame: the most urgent one (error, then warning, then AI
 * thinking, then in progress). When everything is done, the last step.
 */
export function focusOf(frame: Frame, steps: string[]): Focus {
	for (const state of urgency) {
		const i = frame.findIndex(([s]) => s === state);
		if (i !== -1) return { state, label: steps[i], note: frame[i][1] };
	}
	const last = frame.length - 1;
	return { state: frame[last][0], label: steps[last], note: frame[last][1] };
}
