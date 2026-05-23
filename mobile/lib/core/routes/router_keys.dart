import 'package:flutter/material.dart';

class RouterKeys {
  // Root Navigator Key (Used for dialogs, bottom sheets, full screen pages)
  static final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>();

  // Sales Role Shell Keys
  static final GlobalKey<NavigatorState> shellSalesDashboardKey = GlobalKey<NavigatorState>(debugLabel: 'shellSalesDashboard');
  static final GlobalKey<NavigatorState> shellSalesTasksKey = GlobalKey<NavigatorState>(debugLabel: 'shellSalesTasks');
  static final GlobalKey<NavigatorState> shellSalesCalendarKey = GlobalKey<NavigatorState>(debugLabel: 'shellSalesCalendar');
  static final GlobalKey<NavigatorState> shellSalesProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellSalesProfile');

  // Warehouse Role Shell Keys
  static final GlobalKey<NavigatorState> shellWarehouseHomeKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseHome');
  static final GlobalKey<NavigatorState> shellWarehouseOrdersKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseOrders');
  static final GlobalKey<NavigatorState> shellWarehouseServiceOrdersKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseServiceOrders');
  static final GlobalKey<NavigatorState> shellWarehouseProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellWarehouseProfile');

  // Service Advisor Role Shell Keys
  static final GlobalKey<NavigatorState> shellAdvisorDashboardKey = GlobalKey<NavigatorState>(debugLabel: 'shellAdvisorDashboard');
  static final GlobalKey<NavigatorState> shellAdvisorAppointmentsKey = GlobalKey<NavigatorState>(debugLabel: 'shellAdvisorAppointments');
  static final GlobalKey<NavigatorState> shellAdvisorProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellAdvisorProfile');
  
  // Technician Role Shell Keys
  static final GlobalKey<NavigatorState> shellTechnicianDashboardKey = GlobalKey<NavigatorState>(debugLabel: 'shellTechnicianDashboard');
  static final GlobalKey<NavigatorState> shellTechnicianTasksKey = GlobalKey<NavigatorState>(debugLabel: 'shellTechnicianTasks');
  static final GlobalKey<NavigatorState> shellTechnicianProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellTechnicianProfile');
}
