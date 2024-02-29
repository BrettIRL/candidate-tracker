'use server';

import {
  deleteScenarioById,
  getScenarios,
  insertScenario,
} from '@/db/repositories/assessments';
import type { NewScenario } from '@/db/schema/assessment';
import { logger } from '@/lib/logger';

export async function addScenario(scenario: NewScenario) {
  try {
    await insertScenario(scenario);

    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}

export async function deleteScenario(scenarioId: number) {
  try {
    await deleteScenarioById(scenarioId);
    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}

export async function fetchScenarios() {
  try {
    const data = await getScenarios();
    return { success: true, data };
  } catch (error) {
    logger.error(error);
    return { success: false, error };
  }
}
