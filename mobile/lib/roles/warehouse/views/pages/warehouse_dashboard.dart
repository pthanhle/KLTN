import 'package:flutter/material.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../shared/widgets/backgrounds/mesh_background.dart';
import '../../../../shared/widgets/containers/glass_card.dart';

class WarehouseDashboardPage extends StatelessWidget {
  const WarehouseDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Warehouse Dashboard'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      extendBodyBehindAppBar: true,
      body: MeshBackground(
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              children: [
                GlassCard(
                  child: Center(
                    child: Text(
                      'warehouse_welcome'.tr(),
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
