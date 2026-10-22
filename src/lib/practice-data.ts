import { PracticeExercise } from '@/types';

export const PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'prac_1',
    difficulty: 'Beginner',
    title: 'Customer Order Cumulative Sum & Running Total',
    businessScenario: 'An e-commerce store needs to display a customer order ledger where each row shows the cumulative lifetime spend up to that transaction.',
    problemStatement: 'Given an `orders` table (order_id, customer_id, order_date, amount), write an analytical query computing the running total of `amount` per customer ordered chronologically.',
    constraints: [
      'Must partition by customer_id',
      'Must use explicit frame specification to prevent duplicate order_date values from clumping',
      'Do not use subqueries or self-joins'
    ],
    hints: [
      'Hint 1: Look into the SUM() window function combined with OVER (PARTITION BY ... ORDER BY ...)',
      'Hint 2: Be cautious of the default frame clause when ORDER BY is present. Default is RANGE, which groups identical dates together.',
      'Hint 3: Use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW to force physical row-by-row accumulation.'
    ],
    testCasesOrCriteria: [
      'Row 1 for customer 101 with amount 50 returns running_total 50',
      'Row 2 for customer 101 with amount 30 returns running_total 80',
      'Different customers reset their running totals independently'
    ]
  },
  {
    id: 'prac_2',
    difficulty: 'Intermediate',
    title: 'Detecting Inactive User Churn Intervals (Gaps & Islands)',
    businessScenario: 'SaaS product analytics requires finding streaks of consecutive active days and identifying any gap greater than 14 days between user logins.',
    problemStatement: 'Given a `user_logins` table (user_id, login_date), find for each user every login where the previous login was more than 14 days prior, or where this is their first login.',
    constraints: [
      'Must handle users with multiple logins on the same day cleanly',
      'Use LAG() or LEAD() window offsets',
      'Result set must report: user_id, current_login_date, days_since_last_login'
    ],
    hints: [
      'Hint 1: First eliminate intra-day duplicates using SELECT DISTINCT or DENSE_RANK() in a base CTE.',
      'Hint 2: Apply LAG(login_date, 1) OVER (PARTITION BY user_id ORDER BY login_date).',
      'Hint 3: In an outer query or filter, compare the date difference: (login_date - prev_login) > 14 OR prev_login IS NULL.'
    ],
    testCasesOrCriteria: [
      'Users with daily logins return 0 churn events',
      'A user logging in Jan 1 and next on Jan 20 triggers a 19-day gap flag',
      'First-ever login properly reports NULL or 0 prior days'
    ]
  },
  {
    id: 'prac_3',
    difficulty: 'Advanced',
    title: 'Multi-Level Bill of Materials (BOM) Cost Rollup',
    businessScenario: 'An electric vehicle manufacturer tracks part assemblies. A car has sub-assemblies (battery pack, chassis), which contain smaller components (cells, sensors, screws). Each sub-part has a unit cost and required quantity multiplier.',
    problemStatement: 'Given a `parts_bom` table (parent_part_id, child_part_id, quantity) and `parts_cost` (part_id, unit_cost), write a recursive query calculating the total aggregated component cost to manufacture 1 finished automobile (root part_id = "EV_MODEL_3").',
    constraints: [
      'Tree depth can be up to 10 levels deep',
      'Quantity must multiply cumulatively across hierarchy levels (e.g., 4 wheels * 5 lug nuts = 20 total)',
      'Guard against cyclic assembly dependencies'
    ],
    hints: [
      'Hint 1: In your anchor query, select the top-level part with cumulative_qty = 1.',
      'Hint 2: In the recursive member, multiply the prior cumulative_qty by the child quantity: prior.cumulative_qty * bom.quantity.',
      'Hint 3: Join the final recursive CTE results against the parts_cost table and calculate SUM(cumulative_qty * unit_cost).'
    ],
    testCasesOrCriteria: [
      'Correctly cascades multipliers across 4 tiers of subassemblies',
      'Detects cycles using an array check: WHERE NOT (child_part_id = ANY(visited_path))',
      'Matches verified BOM cost of \$42,850'
    ]
  }
];
