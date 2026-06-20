import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:easy_localization/easy_localization.dart';
import '../../../../../../core/utils/theme_extension.dart';
import '../../controllers/contracts_provider.dart';
import '../cards/contract_card.dart';
import '../cards/contract_card_skeleton.dart';
import '../empty/contracts_empty_state.dart';
import '../../views/contract_detail_page.dart';

/// Sliver-based list view for contracts — compatible with CupertinoSliverNavigationBar
class ContractsSliverListView extends ConsumerWidget {
  const ContractsSliverListView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(contractsProvider);

    if (state.isLoading) {
      return SliverPadding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        sliver: SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) => const ContractCardSkeleton(),
            childCount: 4,
          ),
        ),
      );
    }

    if (state.error != null) {
      return SliverFillRemaining(
        child: CupertinoScrollerRefreshableEmptyState(
          isError: true,
          onRefresh: () =>
              ref.read(contractsProvider.notifier).fetchContracts(isRefresh: true),
        ),
      );
    }

    if (state.contracts.isEmpty) {
      return SliverFillRemaining(
        child: CupertinoScrollerRefreshableEmptyState(
          isError: false,
          onRefresh: () =>
              ref.read(contractsProvider.notifier).fetchContracts(isRefresh: true),
        ),
      );
    }

    return SliverPadding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      sliver: SliverList(
        delegate: SliverChildBuilderDelegate(
          (context, index) {
            if (index >= state.contracts.length) {
              return const Padding(
                padding: EdgeInsets.all(16.0),
                child: Center(child: CupertinoActivityIndicator()),
              );
            }
            final contract = state.contracts[index];
            return ContractCard(
              contract: contract,
              onTap: () {
                Navigator.of(context).push(
                  CupertinoPageRoute(
                    builder: (_) => ContractDetailPage(contract: contract),
                  ),
                );
              },
            );
          },
          childCount: state.contracts.length + (state.isFetchingMore ? 1 : 0),
        ),
      ),
    );
  }
}

/// Pull-to-refresh empty state — CupertinoSliverRefreshControl style
class CupertinoScrollerRefreshableEmptyState extends StatelessWidget {
  final bool isError;
  final Future<void> Function() onRefresh;

  const CupertinoScrollerRefreshableEmptyState({
    super.key,
    required this.isError,
    required this.onRefresh,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onVerticalDragEnd: (details) {
        if (details.primaryVelocity != null && details.primaryVelocity! > 200) {
          onRefresh();
        }
      },
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isError
                  ? CupertinoIcons.exclamationmark_triangle
                  : CupertinoIcons.doc_text_search,
              size: 56,
              color: context.colors.onSurface.withValues(alpha: 0.2),
            ),
            const SizedBox(height: 16),
            Text(
              isError ? 'Đã có lỗi xảy ra' : 'Không có hợp đồng',
              style: context.textTheme.titleMedium?.copyWith(
                color: context.colors.onSurface.withValues(alpha: 0.5),
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              isError ? 'Kéo xuống để thử lại' : 'Chưa có hợp đồng phù hợp bộ lọc',
              style: context.textTheme.bodySmall?.copyWith(
                color: context.colors.onSurface.withValues(alpha: 0.35),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
