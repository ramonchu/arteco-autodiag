// src/ai/flows/generate-actionable-insights.ts
'use server';

/**
 * @fileOverview Generates actionable insights based on the user's self-assessment.
 *
 * - generateActionableInsights - A function that generates actionable insights based on the self-assessment data.
 * - GenerateActionableInsightsInput - The input type for the generateActionableInsights function.
 * - GenerateActionableInsightsOutput - The return type for the generateActionableInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionableInsightsInputSchema = z.object({
  answers: z
    .record(z.string(), z.string())
    .describe('A map of question keys to answer values from the self-assessment.'),
});
export type GenerateActionableInsightsInput = z.infer<
  typeof GenerateActionableInsightsInputSchema
>;

const GenerateActionableInsightsOutputSchema = z.object({
  insight: z
    .string()
    .describe(
      'A single actionable insight for the user based on their self-assessment answers.'
    ),
});
export type GenerateActionableInsightsOutput = z.infer<
  typeof GenerateActionableInsightsOutputSchema
>;

export async function generateActionableInsights(
  input: GenerateActionableInsightsInput
): Promise<GenerateActionableInsightsOutput> {
  return generateActionableInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionableInsightsPrompt',
  input: {schema: GenerateActionableInsightsInputSchema},
  output: {schema: GenerateActionableInsightsOutputSchema},
  prompt: `Based on the following self-assessment answers, provide a single actionable insight for the user to improve their IT maturity. Focus on the area where they seem to be struggling the most.

Answers:
{{#each answers}}
  {{@key}}: {{{this}}}
{{/each}}

Actionable Insight:`,
});

const generateActionableInsightsFlow = ai.defineFlow(
  {
    name: 'generateActionableInsightsFlow',
    inputSchema: GenerateActionableInsightsInputSchema,
    outputSchema: GenerateActionableInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
