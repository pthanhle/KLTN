import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'controllers/service_packing_controller.dart';
import 'widgets/packing_detail/packing_glass_header.dart';
import 'widgets/packing_detail/packing_tech_info_card.dart';
import 'widgets/packing_detail/packing_part_list.dart';
import 'widgets/packing_detail/packing_bottom_island.dart';
import 'widgets/packing_detail/packing_handover_sheet.dart';

class ServicePackingDetailPage extends ConsumerStatefulWidget {
  final String orderId;

  const ServicePackingDetailPage({
    super.key,
    required this.orderId,
  });

  @override
  ConsumerState<ServicePackingDetailPage> createState() => _ServicePackingDetailPageState();
}

class _ServicePackingDetailPageState extends ConsumerState<ServicePackingDetailPage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(servicePackingProvider.notifier).loadOrder(widget.orderId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final state = ref.watch(servicePackingProvider);

    if (state.order == null) {
      return CupertinoPageScaffold(
        backgroundColor: theme.colorScheme.surface,
        child: const Center(
          child: CupertinoActivityIndicator(),
        ),
      );
    }

    final order = state.order!;

    return CupertinoPageScaffold(
      backgroundColor: theme.colorScheme.surface,
      child: Stack(
        children: [
          Positioned.fill(
            child: Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: theme.brightness == Brightness.dark
                      ? [
                          const Color(0xFF0F172A),
                          const Color(0xFF1E293B),
                        ]
                      : [
                          const Color(0xFFF7F9FB),
                          const Color(0xFFE0E3E5),
                        ],
                ),
              ),
            ),
          ),
          
          SafeArea(
            bottom: false,
            child: Column(
              children: [
                const PackingGlassHeader(),
                
                Expanded(
                  child: CustomScrollView(
                    physics: const AlwaysScrollableScrollPhysics(parent: BouncingScrollPhysics()),
                    slivers: [
                      SliverToBoxAdapter(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
                          child: PackingTechInfoCard(
                            technician: order.assignedTechnician,
                            licensePlate: order.customer.licensePlate,
                          ),
                        ),
                      ),
                      
                      SliverPadding(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        sliver: PackingPartList(
                          orderId: widget.orderId,
                          parts: order.parts,
                          packedQuantities: state.packedQuantities,
                        ),
                      ),
                      
                      const SliverToBoxAdapter(
                        child: SizedBox(height: 140),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          Positioned(
            left: 0,
            right: 0,
            bottom: 0,
            child: PackingBottomIsland(
              orderId: widget.orderId,
              totalItems: order.totalItems,
              pickedItems: state.pickedCount,
              isSubmitting: state.isSubmitting,
              onHandover: () {
                showCupertinoModalPopup(
                  context: context,
                  builder: (context) => PackingHandoverSheet(
                    technician: order.assignedTechnician,
                    licensePlate: order.customer.licensePlate,
                    totalParts: order.parts.length,
                    onConfirm: () async {
                      final success = await ref.read(servicePackingProvider.notifier).submitHandover();
                      if (success && context.mounted) {
                        Future.delayed(const Duration(milliseconds: 800), () {
                          if (context.mounted) {
                            context.pop();
                          }
                        });
                        return true;
                      }
                      return false;
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
