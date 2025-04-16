import { getTemplateDraft } from '@api/queries';
import { useApiQuery } from '@utils/lib/use-api-query';
import { useOutletContext } from 'react-router-dom';
import { TemplateOutletContext } from '../types';
import { TemplateType } from '@globalTypes/templates.draft';

export const useDefaultValues = () => {
  const { id: draftId, state: templateState } =
    useOutletContext<TemplateOutletContext>();

  const { data: draftResponse } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draftId },
  });

  if (!draftResponse) {
    const draftInfo = {
      id: draftId,
      state: templateState,
      name: '',
      categories: [],
      languages: [],
    };

    const dockerImage = {
      id: draftId,
      state: templateState,
      type: TemplateType.managed,
      managed: { versions: [{ name: 'latest' }] },
    };

    const draftSettings = {
      id: draftId,
      state: templateState,
      settings: {
        secrets: [{ name: 'DATABASE_URI' }],
        configs: [{ path: '/app/logging.cfg' }],
        env_vars: [{ key: 'DOCS_PATH', value: '/docs' }],
        ports: [],
        health_check: {
          test: 'curl --fail -s http://localhost:8080/health/check',
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
      id: draftId,
      state: templateState,
      serviceName: '',
      name: 'Untitled',
      description: '',
      secrets: [{ name: 'DATABASE_URI' }],
      configs: [{ path: '/app/logging.cfg' }],
      env_vars: [{ key: 'DOCS_PATH', value: '/docs' }],
      ports: [],
      mapper: { type: TemplateType.managed },
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

  const { ports, ...restSettings } = settings;

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
    settings: { ...restSettings, ports: ports.map(port => ({ name: port })) },
    dependencies,
  };

  const mapper = {
    ...state,
    serviceName: name,
    name: 'Untitled',
    description: '',
    secrets: draftSettings.settings.secrets,
    configs: draftSettings.settings.configs,
    env_vars: draftSettings.settings.env_vars,
    ports: draftSettings.settings.ports,
    mapper: mapperResponse,
  };

  return { draftInfo, dockerImage, draftSettings, mapper, status };
};
