import { IconType } from '@components/Icon';
import { RouteMap } from './types';

export const navLinksHome = [
  { title: 'Home', href: RouteMap.home, iconType: IconType.cube },
  { title: 'Namespaces', href: RouteMap.namespaces, iconType: IconType.graph },
  {
    title: 'Templates HUB',
    href: RouteMap.templates,
    iconType: IconType.template,
  },
];

export const navLinksNameSpace = [
  { title: 'Home', href: RouteMap.home, iconType: IconType.cube },
  { title: 'Projects', href: RouteMap.projects, iconType: IconType.cube },
  { title: 'Staff', href: RouteMap.staff, iconType: IconType.graph },
  { title: 'Billing', href: RouteMap.billing, iconType: IconType.template },
];

export const navLinksProject = [
  { title: 'Home', href: RouteMap.home, iconType: IconType.cube },
  { title: 'Services', href: RouteMap.services, iconType: IconType.cube },
  { title: 'Networks', href: RouteMap.networks, iconType: IconType.graph },
  { title: 'Volumes', href: RouteMap.volumes, iconType: IconType.template },
  { title: 'Configs', href: RouteMap.configs, iconType: IconType.config },
  { title: 'Secrets', href: RouteMap.secrets, iconType: IconType.secret },
  { title: 'Deploy', href: RouteMap.deploy, iconType: IconType.deploy },
  { title: 'Git', href: RouteMap.git, iconType: IconType.git },
  { title: 'Registries', href: RouteMap.registries, iconType: IconType.git },
  { title: 'Team', href: RouteMap.team, iconType: IconType.graph },
];

export const actionButtons = [
  { title: 'Notifications', iconType: IconType.cube },
  { title: 'Support center', iconType: IconType.support },
  { title: 'Settings', iconType: IconType.settings },
];

export const navLinksMap = new Map([
  [RouteMap.home, navLinksHome],
  [RouteMap.namespace, navLinksNameSpace],
  [RouteMap.project, navLinksProject],
]);
