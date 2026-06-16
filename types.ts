// Importing React to resolve the missing namespace for React.ReactNode
import React from 'react';

export interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface PricingTab {
  id: string;
  label: string;
}

export interface PricingItem {
  category: string;
  item: string;
  description: string;
  price: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}