'use client';

import dynamic from 'next/dynamic';

const RuleAssignmentForm = dynamic(() => import('../components/RuleAssignmentForm'), {
  ssr: false,
});

export default RuleAssignmentForm;