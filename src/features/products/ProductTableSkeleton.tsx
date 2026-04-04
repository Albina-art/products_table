import styled from 'styled-components';

const SKELETON_ROWS = 10;

const Wrap = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.grey[200]};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.fonts.robotoMono};
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
`;

const TheadRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  background: rgba(249, 250, 251, 0.5);
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
`;

const SkeletonBlock = styled.div<{ $w?: string; $h?: string; $round?: boolean }>`
  height: ${({ $h }) => $h ?? '1rem'};
  width: ${({ $w }) => $w ?? '100%'};
  max-width: ${({ $w }) => $w};
  border-radius: ${({ $round, theme }) => ($round ? theme.borderRadius.full : '4px')};
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Flex = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export function ProductTableSkeleton() {
  return (
    <Wrap>
      <Table>
        <thead>
          <TheadRow>
            <Th style={{ width: '3rem' }}>
              <SkeletonBlock className="skeleton" $w="1rem" $round />
            </Th>
            <Th>
              <SkeletonBlock className="skeleton" $w="6rem" />
            </Th>
            <Th>
              <SkeletonBlock className="skeleton" $w="4rem" />
            </Th>
            <Th>
              <SkeletonBlock className="skeleton" $w="4rem" />
            </Th>
            <Th>
              <SkeletonBlock className="skeleton" $w="3.5rem" />
            </Th>
            <Th>
              <SkeletonBlock className="skeleton" $w="4rem" />
            </Th>
            <Th style={{ width: '6rem' }} />
          </TheadRow>
        </thead>
        <tbody>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <Tr key={i}>
              <Td>
                <SkeletonBlock className="skeleton" $w="1rem" $round />
              </Td>
              <Td>
                <Stack>
                  <SkeletonBlock className="skeleton" $w="200px" />
                  <SkeletonBlock className="skeleton" $w="120px" $h="0.75rem" />
                </Stack>
              </Td>
              <Td>
                <SkeletonBlock className="skeleton" $w="5rem" />
              </Td>
              <Td>
                <SkeletonBlock className="skeleton" $w="6rem" />
              </Td>
              <Td>
                <SkeletonBlock className="skeleton" $w="3rem" />
              </Td>
              <Td>
                <SkeletonBlock className="skeleton" $w="4rem" />
              </Td>
              <Td>
                <Flex>
                  <SkeletonBlock className="skeleton" $w="2rem" $h="2rem" $round />
                  <SkeletonBlock className="skeleton" $w="2rem" $h="2rem" $round />
                </Flex>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Wrap>
  );
}
