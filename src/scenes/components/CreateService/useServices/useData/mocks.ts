import { CategoryData } from '@globalTypes/categories';
import { tourMode } from '../../../../../utils/tourMode';

import { ResponseData } from './types';

const categories: CategoryData[] = [
    {
      "key": "API_MANAGEMENT",
      "value": "API Management"
  },
  {
      "key": "CONTENT_MANAGEMENT",
      "value": "Content Management"
  },
  {
      "key": "DATA_SCIENCE",
      "value": "Data Science"
  },
  {
      "key": "DATABASE",
      "value": "Database"
  },
  {
      "key": "DEVELOPER_TOOLS",
      "value": "Developer Tools"
  },
  {
      "key": "INTEGRATION_AND_DELIVERY",
      "value": "Integration and Delivery"
  },
  {
      "key": "INTERNET_OF_THINGS",
      "value": "Internet of Things"
  },
  {
      "key": "LANGUAGES_AND_FRAMEWORKS",
      "value": "Languages and Frameworks"
  },
  {
      "key": "MACHINE_LEARNING_AND_AI",
      "value": "Machine Learning & AI"
  },
  {
      "key": "MESSAGE_BROKER",
      "value": "Message Broker"
  },
  {
      "key": "MONITORING",
      "value": "Monitoring"
  },
  {
      "key": "NETWORKING",
      "value": "Networking"
  },
  {
      "key": "OPERATING_SYSTEM",
      "value": "Operating System"
  },
  {
      "key": "SECURITY",
      "value": "Security"
  },
  {
      "key": "STORAGE",
      "value": "Storage"
  },
  {
      "key": "WEB_ANALYTICS",
      "value": "Web Analytics"
  },
  {
      "key": "WEB_SERVER",
      "value": "Web Server"
  }
];

export const getMockData = async (): Promise<ResponseData> => {
  // Shorter delay in tour mode for better UX
  const delay = tourMode.isActive() ? 100 : 300;
  await new Promise(resolve => setTimeout(resolve, delay));

  return {
    categories,
  };
};
