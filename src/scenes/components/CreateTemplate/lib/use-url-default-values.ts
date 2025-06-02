import { useOutletContext } from 'react-router-dom';
import { TemplateOutletContext } from '../types';
import { MapperType, TemplateType } from '@globalTypes/templates.draft';
import { useUrlDraft } from './use-url-draft';

export const useUrlDefaultValues = () => {
  const { state: templateState } = useOutletContext<TemplateOutletContext>();
  const { draftId, draftData: draftResponse } = useUrlDraft();

  if (!draftResponse || !draftId) {
    const draftInfo = {
      id: draftId || '',
      state: templateState,
      name: '',
      categories: [],
      languages: [],
    };

    const dockerImage = {
      id: draftId || '',
      state: templateState,
      type: TemplateType.managed,
      managed: { versions: [{ name: 'latest' }] },
    };

    const draftSettings = {
      id: draftId || '',
      state: templateState,
      settings: {
        secrets: [{ name: 'DATABASE_URI' }],
        configs: [{ path: '/app/logging.cfg' }],
        env_vars: [{ key: 'DOCS_PATH', value: '/docs' }],
        ports: [],
        health_check: {
          test: 'true',
          interval: 30,
          timeout: 10,
          retries: 6,
          start_period: 20,
        },
        deployment: {
          restart_policy: {
            condition: 0,
            delay: 0,
            max_attempts: 0,
            window: 0,
          },
          rollback_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
          update_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
        },
      },
      dependencies: [],
    };

    const mapper = {
      id: draftId || '',
      state: templateState,
      serviceName: draftInfo.name,
      previewName: 'Untitled',
      previewDescription: '',
      secrets: draftSettings.settings.secrets,
      configs: draftSettings.settings.configs,
      env_vars: draftSettings.settings.ports,
      ports: draftSettings.settings.ports,
      mapper: { type: MapperType.managed },
    };

    return { draftInfo, dockerImage, draftSettings, mapper };
  }

  const {
    managed,
    custom,
    info,
    settings,
    dependencies,
    mapper: mapperResponse,
  } = draftResponse;

  const { ports, health_check, ...restSettings } = settings;

  const { id, type, status, name, description, languages, categories, docs } =
    info;

  const { url, versions } = managed;

  const state = { id, state: templateState };

  const draftInfo = {
    ...state,
    name,
    description,
    languages,
    categories,
    docs,
  };

  const dockerImage = {
    ...state,
    type,
    managed: { url, versions: versions.map(version => ({ name: version })) },
    custom,
  };

  const draftSettings = {
    ...state,
    settings: { 
      ...restSettings, 
      ports: ports.map(port => ({ name: port })),
      health_check: {
        ...health_check,
        test: health_check.test || 'true'
      }
    },
    dependencies,
  };

  const mapper = {
    ...state,
    serviceName: name,
    previewName: 'Untitled',
    previewDescription: '',
    secrets: settings.secrets,
    configs: settings.configs,
    env_vars: settings.env_vars,
    ports: ports.map(port => ({ name: port })),
    mapper: mapperResponse,
  };

  return { draftInfo, dockerImage, draftSettings, mapper };
}; 